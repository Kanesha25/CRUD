const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");


router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", getEmployee, (req, res) => {
  res.json(res.employee);
});


router.post("/", async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/:id", getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }
  if (req.body.position != null) {
    res.employee.position = req.body.position;
  }
  if (req.body.department != null) {
    res.employee.department = req.body.department;
  }

  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:id", getEmployee, async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (deletedEmployee) {
      res.json({ message: "Deleted Employee", deletedEmployee });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getEmployee(req, res, next) {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.employee = employee;
  next();
}

module.exports = router;
