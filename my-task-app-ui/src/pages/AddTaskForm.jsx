import React, { useState } from 'react';
import { createTask } from '../api/taskService';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../api/mockUsers';
import { mockPriorities } from '../api/mockPriorities';

function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createTask({ title, priority, assignedUser, description, dueDate });
      navigate('/'); // redirect to dashboard after success
    } catch (err) {
      setError('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>

      {/* Priority */}
      <label>Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required>
        <option value="">Select priority</option>
        {mockPriorities.map((priority) => (
          <option key={priority.id} value={priority.name}>
            {priority.name}
          </option>
        ))}
      </select>

      {/* Assignment Control */}
      <label>Assign to</label>
      <select
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}>
        <option value="">Select user</option>
        {mockUsers.map((user) => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Task</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default AddTaskForm;
