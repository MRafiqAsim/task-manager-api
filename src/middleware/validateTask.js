const { body, validationResult } = require("express-validator");
const { TASK_STATUS } = require("../config/enums");
const MESSAGES = require("../config/messages");
const errorResponse = require("../utils/errorResponse");

const validateTask = [
    body("title")
    .notEmpty().withMessage(MESSAGES.VALIDATION.TITLE_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.TITLE_MUST_BE_STRING),
    body("description")
    .notEmpty().withMessage(MESSAGES.VALIDATION.DESCRIPTION_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.DESCRIPTION_MUST_BE_STRING),
    body("status")
        .optional()
        .isIn(Object.values(TASK_STATUS))
        .withMessage(MESSAGES.VALIDATION.STATUS_INVALID),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errorResponse(400, MESSAGES.ERROR.VALIDATION_FAILED, errors.array()));
        }
        next();
    },
];

module.exports = validateTask;
