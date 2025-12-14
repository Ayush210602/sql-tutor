import React, { useEffect, useState } from 'react';
import apiFetch from '../api';
import { useAuth } from '../auth/AuthContext';

export default function Leaderboard() {
  const { token } = useAuth();
  const [data, setData] = useState({ leaders: [], your_rank: null });

  useEffect(() => {
    apiFetch('/leaderboard/', { token })
      .then(setData)
      .catch(console.error);
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <ol className="list-decimal list-inside">
            {data.leaders.slice(0, 10).map((l, i) => (
              <li key={l.username} className="p-2 border-b flex justify-between items-center">
                <div>
                  <div className="font-medium">{l.username}</div>
                  <div className="text-sm text-gray-500">Points: {l.points} • Stars: {l.stars}</div>
                </div>
                <div className="text-sm text-gray-400">#{i + 1}</div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="text-sm text-gray-600">Your Rank</h4>
          <div className="mt-2 p-4 border rounded">Rank: {data.your_rank ?? '—'}</div>
        </div>
      </div>
    </div>
  );
}