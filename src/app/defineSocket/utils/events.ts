let events: any = {};

const setEvent = (eventname: string, event: any) => {
  events[eventname] = event;
}

const getEvent = (eventname: string) => {
  return events[eventname];
}

const getEvents = () => events

export { setEvent, getEvent, getEvents };