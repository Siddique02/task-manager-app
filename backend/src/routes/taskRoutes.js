import express from 'express';
import Task from '../models/Task.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Get all tasks for user
router.get('/', protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// Create new task
router.post('/', protect, async (req, res) => {
  console.log("hello there");
  
  const { title, description, status, dueDate } = req.body;
  const task = await Task.create({ title, description, status, dueDate, user: req.user._id });
  res.status(201).json(task);
});

// Update task
router.put('/:id', protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: 'Not authorized' });

  Object.assign(task, req.body);
  const updatedTask = await task.save();
  res.json(updatedTask);
});

// Delete task
router.delete('/:id', protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: 'Not authorized' });

  await task.deleteOne();
  res.json({ message: 'Task removed' });
});

export default router;