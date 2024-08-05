import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
const moment = require("moment");
moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          id: eventsData.length + 1,
          start,
          end,
          title,
          desc: "",
        },
      ]);
  };
  return (
    <div >
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
