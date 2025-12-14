import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiFetch from '../../api';
import { useAuth } from '../../auth/AuthContext';

export default function EventsList() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiFetch('/events/', { token })
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div className="p-6">Loading events...</div>;
  if (!events.length) return <div className="p-6">No events scheduled.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Events (Challenges)</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {events.map(ev => (
          <div key={ev.id} className="border p-4 rounded">
            <h3 className="font-medium">{ev.title}</h3>
            <p className="text-sm text-gray-600">{ev.short_desc}</p>
            <div className="mt-2 text-sm text-gray-500">
              {ev.start_date} → {ev.end_date}
            </div>
            <div className="mt-3 flex gap-2">
              <Link to={`/events/${ev.id}`} className="px-3 py-1 bg-blue-600 text-white rounded">Open</Link>
              <EnrollButton id={ev.id} token={token} enrolled={ev.enrolled} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnrollButton({ id, token, enrolled }) {
  const [state, setState] = useState(enrolled);

  async function enroll() {
    try {
      await apiFetch(`/events/${id}/enroll/`, { method: 'POST', token });
      setState(true);
    } catch (err) {
      alert('Enroll failed: ' + err);
    }
  }

  if (state) return <div className="px-3 py-1 bg-green-100 rounded text-sm">Enrolled</div>;
  return <button className="px-3 py-1 bg-gray-100 rounded" onClick={enroll}>Enroll</button>;
}