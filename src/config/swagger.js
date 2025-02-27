const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { TASK_STATUS } = require("./enums");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "Task Management API Description",
        },
        servers: [
            {
                url: "http://localhost:5001/api/v1",
                description: "Local server",
            },
        ],
        components: {
            schemas: {
                Task: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        status: { 
                            type: "string", 
                            enum: Object.values(TASK_STATUS) 
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"],
};

// Generate Swagger Docs
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger Docs available at http://localhost:5001/api-docs");
}

//Export as a function
module.exports = swaggerDocs;
