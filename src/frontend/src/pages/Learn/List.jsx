import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiFetch from '../../api';
import { useAuth } from '../../auth/AuthContext';

export default function LearnList() {
  const { token } = useAuth();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    apiFetch('/learn/', { token })
      .then(setModules)
      .catch(console.error);
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Learn</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {modules.map(m => (
          <div key={m.id} className="border p-4 rounded">
            <h3 className="font-medium">{m.title}</h3>
            <p className="text-sm text-gray-600">{m.description}</p>
            <div className="mt-3">
              <Link to={`/learn/${m.id}`} className="px-3 py-1 bg-blue-600 text-white rounded">Open Module</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}