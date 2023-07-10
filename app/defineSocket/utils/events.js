let events = {};

const setEvent = (eventname, event) => {
  events[eventname] = event;
}

const getEvent = (eventname) => {
  return events[eventname];
}

const getEvents = () => events

module.exports = {
  setEvent: setEvent,
  getEvent: getEvent,
  getEvents: getEvents
};