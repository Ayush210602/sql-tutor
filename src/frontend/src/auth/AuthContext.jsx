import React, { createContext, useContext, useState, useEffect } from 'react';
import apiFetch from '../api';


const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
const [token, setToken] = useState(localStorage.getItem('token'));
const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));


useEffect(()=>{ if (token) localStorage.setItem('token', token); else localStorage.removeItem('token'); }, [token]);
useEffect(()=>{ if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user'); }, [user]);


async function login(username, password) {
const data = await apiFetch('/auth/login/', { method: 'POST', body: { username, password } });
setToken(data.token); setUser(data.user); return data.user;
}
async function logout() { await apiFetch('/auth/logout/', { method: 'POST', token }); setToken(null); setUser(null); }


return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { return useContext(AuthContext); }