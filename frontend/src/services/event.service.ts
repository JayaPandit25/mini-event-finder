import axios from 'axios';
import { Event, CreateEventDto } from '../types/event';

const API_URL = '/api';

export const eventService = {
  async getAllEvents(location?: string) {
    const params = location ? { location } : {};
    const response = await axios.get<Event[]>(`${API_URL}/events`, { params });
    return response.data;
  },

  async getEventById(id: string) {
    const response = await axios.get<Event>(`${API_URL}/events/${id}`);
    return response.data;
  },

  async createEvent(event: CreateEventDto) {
    const response = await axios.post<Event>(`${API_URL}/events`, event);
    return response.data;
  }
};