"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const uuid_1 = require("uuid");
// In-memory storage
const events = [];
const createEvent = (eventData) => {
    const event = {
        ...eventData,
        id: (0, uuid_1.v4)(),
        currentParticipants: 0,
    };
    events.push(event);
    return event;
};
exports.createEvent = createEvent;
const getAllEvents = (location) => {
    if (location) {
        return events.filter(event => event.location.toLowerCase().includes(location.toLowerCase()));
    }
    return events;
};
exports.getAllEvents = getAllEvents;
const getEventById = (id) => {
    return events.find(event => event.id === id);
};
exports.getEventById = getEventById;
