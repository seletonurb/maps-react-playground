import { convertTimestampToHourOfTheDay } from './dateUtils';

const common = {
  goToHash: name => {
    window.location.hash(name);
    console.log(name);
  }
};

export const generateTimestampId = () => new Date().getTime();

export const updateHash = hash => {
  window.location.hash = hash;
};

export const getItineraryEventDateLabel = (itineraryEvent, hourOnly) => {
  const hourOfTheDay = convertTimestampToHourOfTheDay(itineraryEvent.timestampStart) || '--:--';
  if (hourOnly) {
    return `${hourOfTheDay}`;
  }
  return `${hourOfTheDay}`;
};

export const parseMapPositionsFromItineraryEvents = events => {
  const mapPositions = events
    .filter(evnt => evnt.latitude !== undefined && evnt.longitude !== undefined)
    .map((evnt, index) => {
      const { latitude, longitude, _id: id } = evnt;
      return { latitude, longitude, textLabel: index + 1, id };
    });
  return mapPositions;
};

export const addMapIndexToItineraryEvents = events => {
  let mapIndex = 1;

  events.forEach(evnt => {
    if (evnt.latitude !== undefined && evnt.longitude !== undefined) {
      evnt.mapIndex = mapIndex++;
    }
  });
};

const defaultEvent = {
  latitude: undefined,
  longitude: undefined,
  name: '',
  address: '',
};

export const resetNewEvent = () => {
  const newEvent = { ...defaultEvent };
  return newEvent;
};

export const initializeMapPositions = (mapEvents = []) => {
  const mapPositions = mapEvents
    .filter(evnt => evnt.mapIndex !== undefined)
    .map(evnt => {
      const { latitude, longitude, mapIndex, _id: id } = evnt;
      return { latitude, longitude, mapIndex, id };
    });

  return mapPositions;
};

export default common;
