import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Calendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="p-4">
      <Calendar onChange={setValue} value={value} />
      <p className="mt-4">📅 Selected date: {value.toDateString()}</p>
    </div>
  );
}
