import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider'; // Adjust path as needed

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = register(username, password);

    if (success) {
      alert('Registration successful! Please login.');
      navigate('/login');
    } else {
      setError('User already exists');
    }
  };

  return (
    <div className="text-center pt-5 w-50 m-auto">
      <h2 className="fw-bold mb-3">Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
            className="btn btn-dark border border-3 border-dark fw-bold fs-6"
            type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
