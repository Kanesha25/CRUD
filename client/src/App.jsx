import React, { useState, useEffect } from "react";
import axios from "./axios";
import ProductList from "./components/Products/ProductList";
import AddProduct from "./components/Products/AddProduct";
import EditProduct from "./components/Products/EditProduct";
import EmployeeList from "./components/Employee/EmployeeList";
import AddEmployee from "./components/Employee/AddEmployee";
import EditEmployee from "./components/Employee/EditEmployee";
import TaskList from "./components/Tasks/TaskList";
import AddTask from "./components/Tasks/AddTask";
import EditTask from "./components/Tasks/EditTask";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  
  useEffect(() => {
    fetchProducts();
    fetchEmployees();
    fetchTasks();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    setProducts(response.data);
  };

  const fetchEmployees = async () => {
    const response = await axios.get("/api/employees");
    setEmployees(response.data);
  };

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data);
  };

  const handleAddProduct = async (product) => {
    const response = await axios.post("/api/products", product);
    setProducts([...products, response.data]);
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const response = await axios.put(`/api/products/${id}`, updatedProduct);
    setProducts(
      products.map((product) => (product._id === id ? response.data : product))
    );
    setCurrentProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  const handleAddEmployee = async (employee) => {
    const response = await axios.post("/api/employees", employee);
    setEmployees([...employees, response.data]);
  };

  const handleUpdateEmployee = async (id, updatedEmployee) => {
    const response = await axios.put(`/api/employees/${id}`, updatedEmployee);
    setEmployees(
      employees.map((employee) =>
        employee._id === id ? response.data : employee
      )
    );
    setCurrentEmployee(null);
  };

  const handleDeleteEmployee = async (id) => {
    await axios.delete(`/api/employees/${id}`);
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  const handleAddTask = async (task) => {
    const response = await axios.post("/api/tasks", task);
    setTasks([...tasks, response.data]);
  };

  const handleUpdateTask = async (id, updatedTask) => {
    const response = await axios.put(`/api/tasks/${id}`, updatedTask);
    setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    setCurrentTask(null);
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="card">
      <h1 className="card-title">CRUD</h1>
      <div className="card-divider"></div>
      <div>
        <h2>Product Management</h2>
        {currentProduct ? (
          <EditProduct
            currentProduct={currentProduct}
            onUpdate={handleUpdateProduct}
          />
        ) : (
          <AddProduct onAdd={handleAddProduct} />
        )}
        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onEdit={setCurrentProduct}
        />

        <h2>Employee Management</h2>
        {currentEmployee ? (
          <EditEmployee
            currentEmployee={currentEmployee}
            onUpdate={handleUpdateEmployee}
          />
        ) : (
          <AddEmployee onAdd={handleAddEmployee} />
        )}
        <EmployeeList
          employees={employees}
          onDelete={handleDeleteEmployee}
          onEdit={setCurrentEmployee}
        />

        <h2>Task Management</h2>
        {currentTask ? (
          <EditTask currentTask={currentTask} onUpdate={handleUpdateTask} />
        ) : (
          <AddTask onAdd={handleAddTask} />
        )}
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={setCurrentTask}
        />
      </div>
    </div>
  );
};

export default App;
