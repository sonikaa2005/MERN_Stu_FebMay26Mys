const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // middleare

mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { app, Todo };