import { useState, useEffect } from 'react';
import { Event } from '../types/event';
import { eventService } from '../services/event.service';

export default function EventListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, [location]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getAllEvents(location || undefined);
      setEvents(data);
      setError('');
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-md"
        />
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <div className="text-sm text-gray-500">
              <p>📍 {event.location}</p>
              <p>📅 {new Date(event.date).toLocaleDateString()}</p>
              <p>👥 {event.currentParticipants}/{event.maxParticipants} participants</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}