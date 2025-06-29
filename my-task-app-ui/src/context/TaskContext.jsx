import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const updateTaskInList = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.taskId === updatedTask.taskId ? updatedTask : t))
    );
  };

  const addTaskToList = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, updateTaskInList, addTaskToList }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);
