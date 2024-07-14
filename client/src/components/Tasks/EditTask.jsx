import React, { useState, useEffect } from 'react';
import axios from '../../axios';

const EditTask = ({ currentTask, onUpdate }) => {
  const [title, setTitle] = useState(currentTask ? currentTask.title : '');
  const [description, setDescription] = useState(currentTask ? currentTask.description : '');
  const [assignedTo, setAssignedTo] = useState(currentTask ? currentTask.assignedTo._id : '');
  const [status, setStatus] = useState(currentTask ? currentTask.status : 'Pending');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setAssignedTo(currentTask.assignedTo._id);
      setStatus(currentTask.status);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(currentTask._id, { title, description, assignedTo, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      />
      <select 
        value={assignedTo} 
        onChange={(e) => setAssignedTo(e.target.value)} 
        required 
      >
        <option value="">Assign to...</option>
        {employees.map(employee => (
          <option key={employee._id} value={employee._id}>
            {employee.name}
          </option>
        ))}
      </select>
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
