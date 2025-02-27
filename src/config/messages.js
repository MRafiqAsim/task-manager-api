const MESSAGES = {
    SUCCESS: {
        TASK_CREATED: "Task created successfully",
        TASK_RETRIEVED: "Task retrieved successfully",
        TASK_UPDATED: "Task updated successfully",
        TASK_DELETED: "Task deleted successfully",
        TASK_CACHED: "Task retrieved from cache",
    },
    ERROR: {
        MISSING_FIELDS: "Title and Description are required",
        TASK_NOT_FOUND: "Task not found",
        INTERNAL_SERVER_ERROR: "Internal Server Error",
        INVALID_STATUS: "Invalid status value. Allowed values: Pending, In Progress, Complete",
        VALIDATION_FAILED: "Validation failed",
        RATE_LIMIT_EXCEEDED: "Too many requests, please try again later.",
        INVALID_ID: "Invalid ID format",
        INVALID_JSON: "Invalid JSON payload",
    },
    VALIDATION: {
        TITLE_REQUIRED: "Title is required",
        TITLE_MUST_BE_STRING: "Title must be a string",
        DESCRIPTION_REQUIRED: "Description is required",
        DESCRIPTION_MUST_BE_STRING: "Description must be a string",
        STATUS_INVALID: "Invalid status value. Allowed values: Pending, In Progress, Complete",
    },
    LOGS: {
        NEW_TASK: (id) => `New task created: ${id}`,
        TASK_CACHE_HIT: (id) => `Cache hit for task ID: ${id}`,
        TASK_CACHE_MISS: (id) => `Cache miss. Task fetched from DB: ${id}`,
        TASK_UPDATED: (id) => `Task updated: ${id}`,
        TASK_DELETED: (id) => `Task deleted: ${id}`,
        ERROR_OCCURRED: (method, error) => `Error in ${method}: ${error.message}`,
    }
};

module.exports = MESSAGES;
