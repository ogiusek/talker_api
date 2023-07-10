const { clients } = require('./clients');
const { getEvent, setEvent, getEvents } = require('./events');
const { socketEmit } = require('./socket');

module.exports = {
  clients: clients,
  getEvent: getEvent,
  setEvent: setEvent,
  getEvents: getEvents,
  socketEmit: socketEmit,
};