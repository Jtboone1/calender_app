const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This is the blueprint for the user tasks!

const UserTasksSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    userTasks: {
        type: Array,
        required: true

    },
    userTodos: {
        type: Array,
        required: true
    },
    email: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserTasks = mongoose.model('usertasks', UserTasksSchema);
