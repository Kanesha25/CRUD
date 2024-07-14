const express = require("express");
const router = express.Router();
const Task = require("../models/Task");


router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", getTask, (req, res) => {
  res.json(res.task);
});


router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    assignedTo: req.body.assignedTo,
    status: req.body.status,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/:id", getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }
  if (req.body.description != null) {
    res.task.description = req.body.description;
  }
  if (req.body.assignedTo != null) {
    res.task.assignedTo = req.body.assignedTo;
  }
  if (req.body.status != null) {
    res.task.status = req.body.status;
  }

  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:id", getTask, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (deletedTask) {
      res.json({ message: "Deleted Task", deletedTask });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id).populate("assignedTo");
    if (task == null) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

module.exports = router;
