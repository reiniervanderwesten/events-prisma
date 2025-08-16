import eventsData from "../../data/events.json" with { type: "json" };

const getEventById = (id) => {
  return eventsData.events.find((event) => event.id === id);
};

export default getEventById;
