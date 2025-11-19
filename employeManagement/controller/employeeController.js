const { getEmployees, saveEmployees } = require("../models/employeeModel");

// GET all employees
exports.getAllEmployees = async (req, res) => {
  const employees = await getEmployees();
  res.json(employees);
};

// POST add employee
exports.addEmployee = async (req, res) => {
  const { name, position, department, salary, status } = req.body;

  if (!name || !position || !department || !salary || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const employees = await getEmployees();
  const newEmployee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1,
    name,
    position,
    department,
    salary,
    status,
  };

  employees.push(newEmployee);
  await saveEmployees(employees);

  res.status(201).json(newEmployee);
};

// PUT update employee
exports.updateEmployee = async (req, res) => {
  const employees = await getEmployees();
  const employee = employees.find(emp => emp.id == req.params.id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  const { name, position, department, salary, status } = req.body;

  if (name) employee.name = name;
  if (position) employee.position = position;
  if (department) employee.department = department;
  if (salary) employee.salary = salary;
  if (status) employee.status = status;

  await saveEmployees(employees);
  res.json(employee);
};

// DELETE employee
exports.deleteEmployee = async (req, res) => {
  let employees = await getEmployees();

  const exists = employees.some(emp => emp.id == req.params.id);
  if (!exists) {
    return res.status(404).json({ error: "Employee not found" });
  }

  employees = employees.filter(emp => emp.id != req.params.id);
  await saveEmployees(employees);

  res.json({ message: "Employee deleted" });
};
