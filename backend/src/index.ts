import express from 'express';
import cors from 'cors';
import { createEvent, getAllEvents, getEventById } from './service';
import { Event } from './types';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Create an event
app.post('/api/events', (req, res) => {
  try {
    const eventData = req.body as Omit<Event, 'id' | 'currentParticipants'>;
    const event = createEvent(eventData);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Invalid event data' });
  }
});

// Get all events
app.get('/api/events', (req, res) => {
  const location = req.query.location as string | undefined;
  const events = getAllEvents(location);
  res.json(events);
});

// Get event by id
app.get('/api/events/:id', (req, res) => {
  const event = getEventById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});