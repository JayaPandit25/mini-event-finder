import { Event } from './types';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage
const events: Event[] = [];

export const createEvent = (eventData: Omit<Event, 'id' | 'currentParticipants'>): Event => {
  const event: Event = {
    ...eventData,
    id: uuidv4(),
    currentParticipants: 0,
  };
  events.push(event);
  return event;
};

export const getAllEvents = (location?: string): Event[] => {
  if (location) {
    return events.filter(event => 
      event.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  return events;
};

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};