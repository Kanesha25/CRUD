import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          {task.title} - {task.description} (Assigned to: {task.assignedTo.name}, Status: {task.status})
          <button onClick={() => onDelete(task._id)}>Delete</button>
          <button onClick={() => onEdit(task)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
