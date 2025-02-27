const rateLimit = require("express-rate-limit");
const MESSAGES = require("../config/messages");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: {
        success: false,
        statusCode: 429,
        message: MESSAGES.ERROR.RATE_LIMIT_EXCEEDED,
    }
});

module.exports = limiter;
