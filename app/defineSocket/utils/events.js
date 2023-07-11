let events = {};

const setEvent = (eventname, event) => {
  events[eventname] = event;
}

const getEvent = (eventname) => {
  return events[eventname];
}

const getEvents = () => events

export { setEvent, getEvent, getEvents };