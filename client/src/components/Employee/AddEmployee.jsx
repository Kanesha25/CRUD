import React, { useState } from 'react';

const AddEmployee = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, position, department });
    setName('');
    setPosition('');
    setDepartment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
        required 
      />
      <input 
        type="text" 
        value={position} 
        onChange={(e) => setPosition(e.target.value)} 
        placeholder="Position" 
        required 
      />
      <input 
        type="text" 
        value={department} 
        onChange={(e) => setDepartment(e.target.value)} 
        placeholder="Department" 
        required 
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
