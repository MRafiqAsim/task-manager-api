const Task = require('../models/taskModel');
const redisClient = require('../config/redis');
const MESSAGES = require('../config/messages');
const errorResponse = require('../utils/errorResponse');
const successResponse = require('../utils/successResponse');
const logger = require('../utils/logger');

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json(errorResponse(400, MESSAGES.ERROR.MISSING_FIELDS));
        }

        const task = new Task({ title, description });
        await task.save();

        logger.info(MESSAGES.LOGS.NEW_TASK(task._id));

        res.status(201).json(successResponse(201, MESSAGES.SUCCESS.TASK_CREATED, task));
    } catch (error) {
        logger.error(MESSAGES.LOGS.ERROR_OCCURRED("createTask", error));
        res.status(500).json(errorResponse(500, MESSAGES.ERROR.INTERNAL_SERVER_ERROR));
    }
};
// Get All Tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(successResponse(200, MESSAGES.SUCCESS.TASK_RETRIEVED, tasks));
    } catch (error) {
        res.status(500).json(errorResponse(500, MESSAGES.ERROR.INTERNAL_SERVER_ERROR));
    }
};
// Get Task by ID (With Redis Caching)
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        // Check Redis cache
        const cachedTask = await redisClient.get(id);
        if (cachedTask) {
            logger.info(MESSAGES.LOGS.TASK_CACHE_HIT(id));
            return res.status(200).json(successResponse(200, MESSAGES.SUCCESS.TASK_CACHED, JSON.parse(cachedTask)));
        }

        // Fetch from DB if not in cache
        const task = await Task.findById(id);
        if (!task) {
            logger.info(MESSAGES.LOGS.TASK_NOT_FOUND(id));
            return res.status(404).json(errorResponse(404, MESSAGES.ERROR.TASK_NOT_FOUND));
        }

        await redisClient.set(id, JSON.stringify(task), 'EX', 3600);
        logger.info(MESSAGES.LOGS.TASK_CACHE_MISS(id));

        res.status(200).json(successResponse(200, MESSAGES.SUCCESS.TASK_RETRIEVED, task));
    } catch (error) {
        logger.error(MESSAGES.LOGS.ERROR_OCCURRED("getTaskById", error));
        res.status(500).json(errorResponse(500, MESSAGES.ERROR.INTERNAL_SERVER_ERROR));
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Find the task first
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json(errorResponse(404, MESSAGES.ERROR.TASK_NOT_FOUND));
        }

        // Update fields
        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        task.updatedAt = Date.now();
        task.increment(); // Automatically increments the version key

        await task.save(); // Ensures OCC and versioning

        await redisClient.del(req.params.id);
        logger.info(MESSAGES.LOGS.TASK_UPDATED(task._id));

        res.status(200).json(successResponse(200, MESSAGES.SUCCESS.TASK_UPDATED, task));
    } catch (error) {
        logger.error(MESSAGES.LOGS.ERROR_OCCURRED("updateTask", error));
        res.status(500).json(errorResponse(500, MESSAGES.ERROR.INTERNAL_SERVER_ERROR));
    }
};


// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json(errorResponse(404, MESSAGES.ERROR.TASK_NOT_FOUND));
        }

        await redisClient.del(req.params.id);
        logger.info(MESSAGES.LOGS.TASK_DELETED(task._id));

        res.status(200).json(successResponse(200, MESSAGES.SUCCESS.TASK_DELETED));
    } catch (error) {
        logger.error(MESSAGES.LOGS.ERROR_OCCURRED("deleteTask", error));
        res.status(500).json(errorResponse(500, MESSAGES.ERROR.INTERNAL_SERVER_ERROR));
    }
};
