import React, { useState, useEffect } from 'react';

const EditEmployee = ({ currentEmployee, onUpdate }) => {
  const [name, setName] = useState(currentEmployee ? currentEmployee.name : '');
  const [position, setPosition] = useState(currentEmployee ? currentEmployee.position : '');
  const [department, setDepartment] = useState(currentEmployee ? currentEmployee.department : '');

  useEffect(() => {
    if (currentEmployee) {
      setName(currentEmployee.name);
      setPosition(currentEmployee.position);
      setDepartment(currentEmployee.department);
    }
  }, [currentEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(currentEmployee._id, { name, position, department });
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
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EditEmployee;
