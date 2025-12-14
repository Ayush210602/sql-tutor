import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';


export default function Nav() {
const { user, logout } = useAuth();
const nav = useNavigate();
return (
<header className="bg-white shadow-sm">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<Link to="/" className="font-bold text-xl">SQL Tutor</Link>
<nav className="space-x-4">
<Link to="/assignments">Assignments</Link>
<Link to="/events">Events</Link>
<Link to="/learn">Learn</Link>
<Link to="/leaderboard">Leaderboard</Link>
</nav>
<div>
{user ? (
<>
<span className="mr-2">{user.username}</span>
<button onClick={() => { logout(); nav('/login'); }}>Logout</button>
</>
) : (
<Link to="/login">Login</Link>
)}
</div>
</div>
</header>
);
}