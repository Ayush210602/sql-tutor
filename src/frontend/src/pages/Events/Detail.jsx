import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiFetch from '../../api';
import { useAuth } from '../../auth/AuthContext';

export default function EventDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/events/${id}/`, { token })
      .then(data => { setEvent(data); setEnrolled(!!data.enrolled); })
      .catch(console.error)
      .finally(()=>setLoading(false));
  }, [id, token]);

  async function enroll() {
    try {
      await apiFetch(`/events/${id}/enroll/`, { method: 'POST', token });
      setEnrolled(true);
    } catch (err) {
      alert('Enroll failed: ' + err);
    }
  }

  if (loading) return <div className="p-6">Loading event...</div>;
  if (!event) return <div className="p-6">Event not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <p className="text-gray-600">{event.description}</p>
        </div>
        <div className="text-sm text-gray-500">
          {event.start_date} → {event.end_date}
        </div>
      </div>

      <div className="mt-6">
        {!enrolled ? (
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={enroll}>Enroll in Event</button>
        ) : (
          <div className="p-3 bg-green-50 rounded">You are enrolled.</div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-medium">Challenges</h3>
        <div className="grid gap-3 mt-3">
          {event.challenges && event.challenges.length ? event.challenges.map(ch => (
            <div key={ch.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{ch.title}</div>
                <div className="text-sm text-gray-500">{ch.short_desc}</div>
              </div>
              <div className="flex gap-2">
                <Link to={`/assignments/${ch.assignment_id}`} className="px-3 py-1 bg-indigo-600 text-white rounded">Open</Link>
                <div className="text-sm text-gray-400">{ch.points} pts • {ch.stars}★</div>
              </div>
            </div>
          )) : <div className="text-sm text-gray-500">No challenges yet.</div>}
        </div>
      </div>
    </div>
  );
}