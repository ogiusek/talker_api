"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = exports.getEvent = exports.setEvent = void 0;
let events = {};
const setEvent = (eventname, event) => {
    events[eventname] = event;
};
exports.setEvent = setEvent;
const getEvent = (eventname) => {
    return events[eventname];
};
exports.getEvent = getEvent;
const getEvents = () => events;
exports.getEvents = getEvents;
//# sourceMappingURL=events.js.map