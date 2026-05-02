const { Todo } = require("./app");

// Create
exports.create = async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
};

// Read all
exports.getAll = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// Read one
exports.getOne = async (req, res) => {
  const todo = await Todo.findById(req.params.id); // params. id is used to get the id from the URL
  res.json(todo);
};

// update
exports.update = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }); // findByIdAndUpdate takes three parameters: the id, the new data, and an options object. The new: true option returns the updated document.
  res.json(todo);
};

// delete

exports.remove = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id); 
  res.json({ message: "Deleted" });
};