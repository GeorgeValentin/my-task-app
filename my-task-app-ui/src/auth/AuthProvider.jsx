import React, { createContext, useContext, useEffect, useState } from 'react';

const USERS_KEY = 'mock_users';
const AUTH_KEY = 'mock_auth_user';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load authenticated user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function register(username, password) {
    const users = getUsers();

    if (users.find((user) => user.username === username)) {
      // User already exists
      return false;
    }

    users.push({ username, password });
    saveUsers(users);
    return true;
  }

  function login(username, password) {
    const users = getUsers();

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }

  function isAuthenticated() {
    return !!user;
  }

  function getAuthenticatedUser() {
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated,
        getAuthenticatedUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
