import { useState, useEffect } from 'react';
import { getAllTasks, deleteTask } from '../api/taskService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider'; // your auth context path
import TaskShowcase from '../components/TaskShowcase';
import { useTaskContext } from '../context/TaskContext';
import { FaPlus } from 'react-icons/fa';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { tasks, setTasks } = useTaskContext();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      setLoading(false);
    }
  };

  const handleRemove = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.taskId !== taskId));
    } catch (err) {
      console.error(err);
      alert('Failed to delete task');
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 py-2">
      {isAuthenticated() && (
        <div className="w-100 text-center mb-4">
          <button
            className="btn btn-success"
            onClick={() => navigate('/add-task')}>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <span>
                <FaPlus />
              </span>
              <span className="fw-bold">New Task</span>
            </div>
          </button>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-start flex-wrap gap-4">
        <TaskShowcase
          name="Inbox"
          tasks={tasks.filter(
            (task) =>
              !task.assignedUser &&
              task.status !== 'complete' &&
              task.priority != 'high'
          )} // tasks not assigned yet
          onDelete={handleRemove}
        />
        <TaskShowcase
          name="Urgent"
          tasks={tasks.filter(
            (task) =>
              task.priority === 'high' &&
              task.status !== 'complete' &&
              !task.assignedUser
          )} // urgent, unassigned & incomplete tasks
          onDelete={handleRemove}
        />
        <TaskShowcase
          name="Assigned"
          tasks={tasks.filter(
            (task) => task.assignedUser && task.status !== 'complete'
          )} // assigned & not complete
          onDelete={handleRemove}
        />
        <TaskShowcase
          name="Completed"
          tasks={tasks.filter((task) => task.status === 'complete')} // completed tasks
          onDelete={handleRemove}
        />
      </div>
    </div>
  );
}

export default Dashboard;
