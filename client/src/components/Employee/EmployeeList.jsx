import React from 'react';

const EmployeeList = ({ employees, onDelete, onEdit }) => {
  return (
    <ul>
      {employees.map(employee => (
        <li key={employee._id}>
          {employee.name} - {employee.position} ({employee.department})
          <button onClick={() => onDelete(employee._id)}>Delete</button>
          <button onClick={() => onEdit(employee)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
