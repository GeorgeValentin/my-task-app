const USERS_KEY = 'mock_users';
const AUTH_KEY = 'mock_auth_user';

export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function register(username, password) {
  const users = getUsers();

  if (users.find((user) => user.username === username)) {
    // User already exists
    return false;
  }

  users.push({ username, password });
  saveUsers(users);
  return true;
}

export function login(username, password) {
  const users = getUsers();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return !!localStorage.getItem(AUTH_KEY);
}

export function getAuthenticatedUser() {
  return JSON.parse(localStorage.getItem(AUTH_KEY));
}
