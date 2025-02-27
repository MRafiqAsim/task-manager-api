const mongoose = require("mongoose");
const { TASK_STATUS } = require("../config/enums");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: Object.values(TASK_STATUS), 
        default: TASK_STATUS.PENDING 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    
    
},
{
    versionKey: "version" // enabling versioning
}
);

TaskSchema.pre("save", function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

module.exports = mongoose.model("Task", TaskSchema);
