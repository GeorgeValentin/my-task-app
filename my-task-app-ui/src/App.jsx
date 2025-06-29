// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import HomeDashboard from './pages/HomeDashboard';
import Register from './pages/Register';
import AssignTaskForm from './pages/AssignTaskForm';
import AddTaskForm from './pages/AddTaskForm';
import { AuthProvider } from './auth/AuthProvider';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/add-task"
              element={
                <ProtectedRoute>
                  <AddTaskForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-task/:taskId"
              element={
                <ProtectedRoute>
                  <AssignTaskForm />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<HomeDashboard />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
