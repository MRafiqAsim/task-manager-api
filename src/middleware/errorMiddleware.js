const MESSAGES = require("../config/messages");
const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json(errorResponse(400, MESSAGES.ERROR.INVALID_JSON, [{ msg: err.message }]));
    }
    if (err.name === "ValidationError") {
        return res.status(400).json(errorResponse(400, MESSAGES.ERROR.VALIDATION_FAILED, err.message));
    }

    if (err.name === "CastError") {
        return res.status(400).json(errorResponse(400, MESSAGES.ERROR.INVALID_ID, err.value));
    }

    return res.status(500).json(errorResponse(500, MESSAGES.ERROR.INTERNAL_SERVER_ERROR));
};

module.exports = errorHandler;
