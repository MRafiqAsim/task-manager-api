const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const limiter = require("./middleware/rateLimiter");
const swaggerDocs = require("./config/swagger");


// Load environment variables
dotenv.config();
/* dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
  }); */
  
console.log("Loaded environment variables for", process.env.NODE_ENV);
console.log("Mongo URI:", process.env.MONGO_URI);
console.log("Redis Host:", process.env.REDIS_HOST);
// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use("/api/v1", taskRoutes);

// Swagger API Docs
swaggerDocs(app);

// Error Handling Middleware
app.use(errorHandler);

// Prevent Multiple `app.listen()`
if (!module.parent) {  
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // Export app

