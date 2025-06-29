import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import './NavBar.css';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link
        className="text-decoration-none fw-bold text-dark fst-italic"
        to="/">
        Dashboard
      </Link>{' '}
      |{' '}
      {!isAuthenticated() ? (
        <>
          <Link
            className="text-decoration-none w-bold text-dark fw-bold fst-italic"
            to="/login">
            Login
          </Link>{' '}
          |{' '}
          <Link
            className="text-decoration-none w-bold text-dark fw-bold fst-italic"
            to="/register">
            Register
          </Link>
        </>
      ) : (
        <>
          <button
            className="text-decoration-none bg-transparent border-0 text-dark fw-bold fst-italic"
            onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
