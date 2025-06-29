import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';

import './TaskShowcase.css';

const TaskShowcase = (props) => {
  const { name, tasks } = props;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
              <p>Description: {task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Assigned User: {task.assignedUser}</p>
              <p>Status: {task.status}</p>
              <p>
                Due:
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : 'No due date'}
              </p>
              {isAuthenticated() && (
                <button
                  className="btn btn-warning fw-bold d-flex justify-content-center align-items-center gap-2"
                  onClick={() => navigate(`/edit-task/${task.taskId}`)}>
                  <span>
                    <FaPen size={14} />
                  </span>
                  <span>Edit</span>
                </button>
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
