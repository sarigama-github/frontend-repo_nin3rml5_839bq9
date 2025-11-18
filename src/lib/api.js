export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export async function getMe(token) {
  const res = await fetch(`${API_BASE}/auth/me?token=${encodeURIComponent(token)}`);
  if (!res.ok) return null;
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).detail || 'Login failed');
  return res.json();
}

export async function signup(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) throw new Error((await res.json()).detail || 'Signup failed');
  return res.json();
}
