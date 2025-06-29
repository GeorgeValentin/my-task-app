import React, { useEffect, useState } from 'react';
import { updateTask, getTaskById } from '../api/taskService';
import { useNavigate, useParams } from 'react-router-dom';
import { mockUsers } from '../api/mockUsers';
import { mockPriorities } from '../api/mockPriorities';
import { useTaskContext } from '../context/TaskContext';

function AssignTaskForm() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [priority, setPriority] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { updateTaskInList } = useTaskContext();

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await getTaskById(taskId);
        setTask(response.data);
        setPriority(response.data.priority || '');
        setAssignedUser(response.data.assignedUser || '');
        setStatus(response.data.status || '');
      } catch (err) {
        setError('Failed to load task');
      }
    }
    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const updatedData = {};
    if (priority !== task.priority) updatedData.priority = priority;
    if (assignedUser !== task.assignedUser)
      updatedData.assignedUser = assignedUser;
    if (status !== task.status) updatedData.status = status;
    if (dueDate !== task.dueDate) updatedData.dueDate = dueDate;

    if (Object.keys(updatedData).length === 0) {
      setError('Please change at least one field before updating.');
      return;
    }

    try {
      const response = await updateTask(taskId, updatedData);

      // refetch the updated object
      const { data: latestTask } = await getTaskById(taskId);
      updateTaskInList(latestTask);

      navigate('/');
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Task: {task.title}</h2>
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

      <label>Status:</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required>
        <option value="" disabled>
          Select status
        </option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </select>
      <button type="submit">Update Task</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default AssignTaskForm;
