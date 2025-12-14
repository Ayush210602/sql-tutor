import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';


export default function Login(){
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [err, setErr] = useState(null);
const { login } = useAuth();
const nav = useNavigate();
async function submit(e){ e.preventDefault(); setErr(null); try { await login(username,password); nav('/'); } catch(ex){ setErr(String(ex)); } }
return (
<div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
<h2 className="text-xl font-semibold mb-4">Login</h2>
<form onSubmit={submit} className="space-y-3">
<input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" className="w-full p-2 border rounded" />
<input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" className="w-full p-2 border rounded" />
{err && <div className="text-red-600">{err}</div>}
<button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
</form>
</div>
);
}