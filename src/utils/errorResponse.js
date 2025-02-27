const errorResponse = (statusCode, message, details = null) => {
    return {
        success: false,
        statusCode,
        message,
        details,
    };
};

module.exports = errorResponse;
