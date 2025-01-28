import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API requests

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // Fetch activities for the selected date
  useEffect(() => {
    const fetchActivities = async () => {
      const date = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      try {
        const response = await axios.get(
          `http://localhost:8080/api/activities/${date}`
        );
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, [selectedDate]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleActivityChange = (e) => {
    setNewActivity(e.target.value);
  };

  const handleAddActivity = async () => {
    if (newActivity.trim() !== "") {
      const date = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      try {
        await axios.post(
          `http://localhost:8080/api/activities/${date}`,
          newActivity,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );
        setActivities((prevActivities) => [...prevActivities, newActivity]);
        setNewActivity("");
      } catch (error) {
        console.error("Error adding activity:", error);
      }
    }
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setSelectedDate(newDate);
  };

  const calendarDays = generateCalendar(year, month);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="arrow-button" onClick={handlePreviousMonth}>
          &lt;
        </button>
        <h3>{`${new Date(year, month).toLocaleString("default", {
          month: "long",
        })} ${year}`}</h3>
        <button className="arrow-button" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="table-content">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day === null ? "empty" : ""} ${
                selectedDate.getDate() === day ? "selected" : ""
              }`}
              onClick={() => day && handleDateSelection(new Date(year, month, day))}
            >
              <p className={day === new Date().getDate() ? "current" : ""}>
                {day ? day : ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="activity-form">
          <h4>Activities for {selectedDate.toLocaleDateString()}</h4>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={newActivity}
              onChange={handleActivityChange}
              placeholder="Add a new activity"
            />
            <button onClick={handleAddActivity}>Add Activity</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;

// Utility function to generate the calendar
const generateCalendar = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }
  const remainingDaysInWeek = 7 - (calendarDays.length % 7);
  if (remainingDaysInWeek < 7) {
    for (let i = 0; i < remainingDaysInWeek; i++) {
      calendarDays.push(null);
    }
  }
  return calendarDays;
};
