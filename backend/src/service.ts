import { Event, CreateEventDto } from './types';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage
const events: Event[] = [];

export const EventService = {
  getAllEvents(location?: string): Event[] {
    if (location) {
      return events.filter(event => 
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    return events;
  },

  getEventById(id: string): Event | undefined {
    return events.find(event => event.id === id);
  },

  createEvent(eventData: CreateEventDto): Event {
    const newEvent: Event = {
      id: uuidv4(),
      ...eventData,
      currentParticipants: 0
    };
    events.push(newEvent);
    return newEvent;
  }
};