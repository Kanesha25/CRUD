import React, { useState, useEffect } from 'react';
import axios from '../../axios';

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Pending');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, description, assignedTo, status });
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setStatus('Pending');
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
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
