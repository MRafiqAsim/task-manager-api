const request = require('supertest');
const app = require('../server');

describe('Task API Tests', () => {
    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/v1/tasks')
            .send({ title: "Test Task", description: "Test description" });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBeTruthy();
    });
});
