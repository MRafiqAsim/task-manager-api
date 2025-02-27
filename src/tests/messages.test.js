const MESSAGES = require("../config/messages");

describe("Messages Configuration", () => {
    test("Should contain success messages", () => {
        expect(MESSAGES.SUCCESS).toHaveProperty("TASK_CREATED");
        expect(MESSAGES.SUCCESS.TASK_CREATED).toBe("Task created successfully");
    });

    test("Should contain error messages", () => {
        expect(MESSAGES.ERROR).toHaveProperty("TASK_NOT_FOUND");
        expect(MESSAGES.ERROR.TASK_NOT_FOUND).toBe("Task not found");
    });

    test("Should contain log messages", () => {
        expect(MESSAGES.LOGS).toHaveProperty("TASK_CACHE_HIT");
        expect(typeof MESSAGES.LOGS.TASK_CACHE_HIT).toBe("function");
    });
});
