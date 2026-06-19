import { clubs } from "../../data/mockClubs";
import { events, venues } from "../../data/mockEvents";
import { students } from "../../data/mockUsers";

export function getEvent(id) {
  return events.find((event) => event.id === id) || events[0];
}

export function getClub(id) {
  return clubs.find((club) => club.id === id) || clubs[0];
}

export function getVenue(id) {
  return venues.find((venue) => venue.id === id) || venues[0];
}

export function getStudent(id) {
  return students.find((student) => student.id === id) || students[0];
}

export function eventViewModel(event) {
  const club = getClub(event.clubId);
  const venue = getVenue(event.venueId);
  return { ...event, club, venue };
}
