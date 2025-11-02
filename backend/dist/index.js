"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const service_1 = require("./service");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Create an event
app.post('/api/events', (req, res) => {
    try {
        const eventData = req.body;
        const event = (0, service_1.createEvent)(eventData);
        res.status(201).json(event);
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid event data' });
    }
});
// Get all events
app.get('/api/events', (req, res) => {
    const location = req.query.location;
    const events = (0, service_1.getAllEvents)(location);
    res.json(events);
});
// Get event by id
app.get('/api/events/:id', (req, res) => {
    const event = (0, service_1.getEventById)(req.params.id);
    if (event) {
        res.json(event);
    }
    else {
        res.status(404).json({ error: 'Event not found' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
