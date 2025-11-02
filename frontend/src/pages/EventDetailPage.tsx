import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Event } from '../types/event';
import { eventService } from '../services/event.service';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const data = await eventService.getEventById(eventId);
      setEvent(data);
      setError('');
    } catch (err) {
      setError('Failed to load event');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 mb-4">{event.description}</p>
          
          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Location</h3>
                <p className="text-gray-800">📍 {event.location}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Date & Time</h3>
                <p className="text-gray-800">📅 {new Date(event.date).toLocaleString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Participants</h3>
                <p className="text-gray-800">
                  👥 {event.currentParticipants}/{event.maxParticipants} participants
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Availability</h3>
                <p className="text-gray-800">
                  {event.currentParticipants >= event.maxParticipants 
                    ? '❌ Event is full'
                    : `✅ ${event.maxParticipants - event.currentParticipants} spots available`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}