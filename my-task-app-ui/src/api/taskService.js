import axios from 'axios';

// Create an axios instance with baseURL (adjust if needed)
const api = axios.create({
  baseURL: 'http://localhost:8000/api/tasks', // your backend base URL for tasks
  // You can add headers or auth tokens here if needed
});

// Fetch all tasks
export const getAllTasks = () => {
  return api.get('/allTasks');
};

// Get a single task by ID
export const getTaskById = (taskId) => {
  return api.get(`/${taskId}`);
};

// Create a new task
export const createTask = (taskData) => {
  return api.post('/', taskData);
};

// Update an existing task
export const updateTask = (taskId, updatedData) => {
  return api.put(`/${taskId}`, updatedData);
};

// Delete a task
export const deleteTask = (taskId) => {
  return api.delete(`/${taskId}`);
};
