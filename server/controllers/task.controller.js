const Task = require('../models/Task');

// GET all tasks for logged-in user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
};

// CREATE a task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, userId: req.user.id });
  res.status(201).json(task);
};

// UPDATE a task (edit title/description)
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

// TOGGLE status between pending ↔ completed
exports.toggleStatus = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  task.status = task.status === 'pending' ? 'completed' : 'pending';
  await task.save();
  res.json(task);
};

// DELETE a task
exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Task deleted' });
};