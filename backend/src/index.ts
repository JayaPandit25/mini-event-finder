import express from 'express';
import cors from 'cors';
import { EventService } from './service';
import { CreateEventDto } from './types';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Get all events
app.get('/api/events', (req, res) => {
  const location = req.query.location as string | undefined;
  const events = EventService.getAllEvents(location);
  res.json(events);
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  const event = EventService.getEventById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  res.json(event);
});

// Create event
app.post('/api/events', (req, res) => {
  try {
    const eventData: CreateEventDto = req.body;
    const newEvent = EventService.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid event data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});