export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
}

export interface CreateEventDto {
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
}