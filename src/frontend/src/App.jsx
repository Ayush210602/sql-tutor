import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './auth/AuthContext';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import AssignmentsList from './pages/Assignments/List';
import AssignmentDetail from './pages/Assignments/Detail';
import EventsList from './pages/Events/List';
import EventDetail from './pages/Events/Detail';
import LearnList from './pages/Learn/List';
import LearnModule from './pages/Learn/Module';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';


export default function App() {
return (
<AuthProvider>
<Router>
<div className="min-h-screen bg-gray-50">
<Nav />
<main>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/assignments" element={<AssignmentsList />} />
<Route path="/assignments/:id" element={<AssignmentDetail />} />
<Route path="/events" element={<EventsList />} />
<Route path="/events/:id" element={<EventDetail />} />
<Route path="/learn" element={<LearnList />} />
<Route path="/learn/:id" element={<LearnModule />} />
<Route path="/leaderboard" element={<Leaderboard />} />
<Route path="/profile" element={<Profile />} />
</Routes>
</main>
</div>
</Router>
</AuthProvider>
);
}