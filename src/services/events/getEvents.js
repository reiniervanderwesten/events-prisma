import eventData from "../../data/events.json" with { type: "json" };

const getEvents = (title, location) => {
  return eventData.events.filter((event) => {
    return (
      (!title || event.title === title) &&
      (!location || event.location === location)
    );
  });
};

export default getEvents;
