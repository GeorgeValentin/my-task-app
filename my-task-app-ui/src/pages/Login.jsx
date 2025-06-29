import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);

    if (success) {
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="text-center pt-5 w-50 m-auto">
      <h2 className="fw-bold mb-3">Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <input
          className="w-75 m-auto mb-3 p-2"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="w-75 m-auto mb-3 p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <button
            className="btn btn-outline-dark border border-3 border-dark fw-bold fs-6"
            type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
