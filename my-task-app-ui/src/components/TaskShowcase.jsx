import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useTaskContext } from '../context/TaskContext';

import './TaskShowcase.css';

const TaskShowcase = (props) => {
  const { name, tasks, onDelete } = props;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { setTasks } = useTaskContext();

  return (
    <article className="task-showcase-container">
      <h2 className="text-center mb-2 fw-bold">{name}</h2>
      {tasks.length === 0 ? (
        <p>No tasks here.</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task.taskId} className="task-showcase pt-2 px-4 pb-1">
              <h3 className=" fst-italic">Task {task.title}</h3>
              <div className="d-flex justify-content-between align-items-center gap-2 flex-row">
                <span className="fw-bold">Description:</span>{' '}
                <span className="fst-italic">{task.description}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center gap-2 flex-row">
                <span className="fw-bold">Priority:</span>
                <span className="fst-italic">{task.priority}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center gap-2 flex-row">
                <span className="fw-bold">Assigned User:</span>{' '}
                <span className="fst-italic">
                  {task.assignedUser ? task.assignedUser : 'No user assigned'}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center gap-2 flex-row">
                <span className="fw-bold">Status:</span>{' '}
                <span className="fst-italic">{task.status}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center gap-2 flex-row">
                <span className="fw-bold">Due:</span>
                <span className="fst-italic">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : 'No due date'}
                </span>
              </div>

              {isAuthenticated() && (
                <div className="d-flex flex-row gap-3">
                  <button
                    className="btn btn-warning fw-bold d-flex justify-content-center align-items-center gap-2"
                    onClick={() => navigate(`/edit-task/${task.taskId}`)}>
                    <span>
                      <FaPen size={14} />
                    </span>
                    <span>Edit</span>
                  </button>

                  <button
                    className="btn btn-danger fw-bold d-flex justify-content-center align-items-center gap-2"
                    onClick={() => onDelete(task.taskId)}>
                    <span>
                      <FaTrash size={14} />
                    </span>
                    <span>Delete</span>
                  </button>
                </div>
              )}
              <hr class="border-bottom border-1 border-secondary" />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default TaskShowcase;
