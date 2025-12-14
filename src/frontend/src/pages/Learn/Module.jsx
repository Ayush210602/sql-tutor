import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiFetch from '../../api';
import { useAuth } from '../../auth/AuthContext';
import SqlMonaco from '../../editors/SqlMonaco';

export default function LearnModule() {
  const { id } = useParams();
  const { token } = useAuth();
  const [module, setModule] = useState(null);
  const [practiceQuery, setPracticeQuery] = useState('');

  useEffect(() => {
    apiFetch(`/learn/${id}/`, { token })
      .then(m => {
        setModule(m);
        if (m.practice && m.practice.length) setPracticeQuery(m.practice[0].template || '');
      })
      .catch(console.error);
  }, [id, token]);

  if (!module) return <div className="p-6">Loading module...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold">{module.title}</h2>
      <div className="mt-4 prose" dangerouslySetInnerHTML={{ __html: module.content_html || module.content }} />

      <div className="mt-6">
        <h3 className="font-medium">Practice Tests</h3>
        <div className="grid gap-3 mt-3">
          {(module.practice || []).map(p => (
            <Link key={p.id} to={`/assignments/${p.assignment_id}`} className="p-3 border rounded">{p.title}</Link>
          ))}
        </div>
      </div>

      {/* Quick inline practice (optional) */}
      {module.quick_practice && (
        <div className="mt-6">
          <h3 className="font-medium">Quick Practice</h3>
          <SqlMonaco value={practiceQuery} onChange={setPracticeQuery} />
          <div className="mt-2">
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => alert('Use assignment page to run and grade (or implement /learn/:id/run)')}>Run (learn-mode)</button>
          </div>
        </div>
      )}
    </div>
  );
}