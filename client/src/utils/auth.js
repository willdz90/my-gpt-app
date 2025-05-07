// src/utils/auth.js
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('token_expiration');
  localStorage.removeItem('last_activity');
  window.location.href = '/';
}
