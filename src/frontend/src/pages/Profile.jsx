import React, { useEffect, useState } from 'react';
import apiFetch from '../api';
import { useAuth } from '../auth/AuthContext';

export default function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [customThreshold, setCustomThreshold] = useState(10);

  useEffect(() => {
    apiFetch('/profile/', { token })
      .then(data => {
        setProfile(data);
        setCustomThreshold(data.points_to_badge || 10);
      })
      .catch(console.error);
  }, [token]);

  async function save() {
    try {
      await apiFetch('/profile/', { method: 'PUT', body: { points_to_badge: customThreshold }, token });
      alert('Saved');
    } catch (err) {
      alert('Save failed: ' + err);
    }
  }

  if (!profile) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold">Profile</h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Username: {profile.username}</div>
        <div className="p-4 border rounded">Points: {profile.points}</div>
        <div className="p-4 border rounded">Stars: {profile.stars}</div>
      </div>

      <div className="mt-6 p-4 border rounded">
        <h4 className="font-medium">Gamification Settings</h4>
        <div className="mt-2 flex gap-2 items-center">
          <label className="text-sm">Points required per reward</label>
          <input type="number" value={customThreshold} onChange={e => setCustomThreshold(Number(e.target.value))} className="border p-1 rounded w-24" />
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}