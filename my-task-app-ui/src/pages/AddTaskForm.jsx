import React, { useState } from 'react';
import { createTask } from '../api/taskService';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../api/mockUsers';
import { mockPriorities } from '../api/mockPriorities';
import './AddTaskForm.css';

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
    <form onSubmit={handleSubmit} className="text-center w-75 m-auto">
      <h2 className="pt-5 fw-bold mb-3">Add New Task</h2>

      <div className="d-flex justify-content-center flex-column gap-2 align-items-center w-50 m-auto">
        <input
          className="w-100 m-auto p-2 mb-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-100 m-auto p-2 mb-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="d-flex justify-content-between align-items-center flex-row w-100 mb-2">
          <span className="fst-italic">Due Date:</span>
          <input
            className="w-75 p-2"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <select
          className="p-2 w-100 mb-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required>
          <option value="">Choose priority</option>
          {mockPriorities.map((priority) => (
            <option key={priority.id} value={priority.name}>
              {priority.name}
            </option>
          ))}
        </select>

        <select
          className="p-2 w-100 mb-3"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}>
          <option value="">Assign</option>
          {mockUsers.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-success border border-success border-2 fw-bold">
        Add Task
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default AddTaskForm;
