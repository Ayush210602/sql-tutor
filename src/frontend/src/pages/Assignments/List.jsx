import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiFetch from '../../api';
import { useAuth } from '../../auth/AuthContext';


export default function AssignmentsList(){
const { token } = useAuth();
const [items, setItems] = useState([]);
useEffect(()=>{ apiFetch('/assignments/', { token }).then(setItems).catch(console.error); }, [token]);
return (
<div className="max-w-6xl mx-auto p-6">
<h2 className="text-xl font-semibold mb-4">Assignments</h2>
<div className="grid gap-3">
{items.map(a=> (
<Link key={a.id} to={`/assignments/${a.id}`} className="p-4 border rounded flex justify-between">
<div>
<div className="font-medium">{a.title}</div>
<div className="text-sm text-gray-600">{a.short_desc}</div>
</div>
<div className="text-sm text-gray-500">{a.difficulty}</div>
</Link>
))}
</div>
</div>
);
}