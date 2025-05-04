const USER_KEY = 'noted_mas_user';

export const setUser = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  return !!getUser();
};