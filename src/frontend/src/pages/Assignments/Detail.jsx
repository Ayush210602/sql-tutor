import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import SqlMonaco from '../../editors/SqlMonaco';


export default function AssignmentDetail(){
const { id } = useParams();
const { token } = useAuth();
const [assignment, setAssignment] = useState(null);
const [query, setQuery] = useState('');
const [result, setResult] = useState(null);
const [feedback, setFeedback] = useState(null);


useEffect(()=>{ apiFetch(`/assignments/${id}/`, { token }).then(d=>{ setAssignment(d); setQuery(d.template||''); }).catch(console.error); }, [id, token]);


async function run(){
setFeedback(null); setResult(null);
try{
const userData = await apiFetch(`/assignments/${id}/run/`, { method: 'POST', body: { query }, token });
const refData = await apiFetch(`/assignments/${id}/run-reference/`, { method: 'POST', token });
setResult({ user: userData, reference: refData });
const match = JSON.stringify(userData.rows || []) === JSON.stringify(refData.rows || []);
setFeedback(match ? { ok:true, message:'Correct' } : { ok:false, message:'Mismatch' });
if(match) await apiFetch('/score/update/', { method: 'POST', body: { assignment_id: id }, token });
}catch(err){ setFeedback({ ok:false, message: String(err) }); }
}


if(!assignment) return <div className="p-6">Loading...</div>;
return (
<div className="max-w-6xl mx-auto p-6">
<div className="flex justify-between items-start">
<div>
<h2 className="text-xl font-semibold">{assignment.title}</h2>
<p className="text-gray-600">{assignment.description}</p>
</div>
<div>Points: <strong>{assignment.points||10}</strong></div>
</div>


<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="md:col-span-2">
<div className="mb-2 font-medium">SQL Editor</div>
<SqlMonaco value={query} onChange={setQuery} />
<div className="mt-3 flex items-center gap-2">
<button className="px-3 py-1 bg-green-600 text-white rounded" onClick={run}>Run</button>
</div>


{result && (
<div className="mt-4">
<h3 className="font-medium">User Result</h3>
<pre className="text-sm bg-white p-2 rounded overflow-auto">{JSON.stringify(result.user, null, 2)}</pre>
<h3 className="font-medium mt-3">Expected Result</h3>
<pre className="text-sm bg-white p-2 rounded overflow-auto">{JSON.stringify(result.reference, null, 2)}</pre>
</div>
)}


{feedback && (
<div className={`mt-4 p-3 rounded ${feedback.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{feedback.message}</div>
)}
</div>


<aside className="p-4 border rounded">
<h4 className="font-medium">Hints</h4>
<ul className="list-disc list-inside text-sm text-gray-600">{(assignment.hints||[]).map((h,i)=><li key={i}>{h}</li>)}</ul>
</aside>
</div>
</div>
);
}