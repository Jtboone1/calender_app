const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This is the blueprint for the user data.

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
    sendemail: Boolean,
    sendphonenumber: Boolean,
    email: String,
    phonenumber: String,
    timeperiod: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserTasks = mongoose.model('usertasks', UserTasksSchema);
