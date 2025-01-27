import React, { useState } from 'react';

// Utility function to get the name of the day from a date
const getDayName = (date) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[date.getDay()];
};

// Utility function to generate the calendar for a specific month and year
const generateCalendar = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Get the number of days in the month
  const daysInMonth = lastDayOfMonth.getDate();

  // Get the day of the week for the first day of the month
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Generate an array for the calendar days (to display empty spaces for the first week)
  const calendarDays = [];

  // Fill in the empty spaces before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Fill in the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Calculate how many empty spaces are needed at the end of the month to complete the last week
  const remainingDaysInWeek = 7 - (calendarDays.length % 7);
  if (remainingDaysInWeek < 7) {
    for (let i = 0; i < remainingDaysInWeek; i++) {
      calendarDays.push(null);
    }
  }

  return calendarDays;
};

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');

  // Get the current month and year
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setActivities([]); // Reset activities when selecting a new date
    console.log("Selected Date: ", date);
  };

  const handleActivityChange = (e) => {
    setNewActivity(e.target.value);
  };

  const handleAddActivity = () => {
    if (newActivity.trim() !== '') {
      setActivities([...activities, newActivity]);
      setNewActivity('');
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
        <button className="arrow-button" onClick={handlePreviousMonth}>&lt;</button>
        <h3>{`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}</h3>
        <button className="arrow-button" onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-body">
        {/* Weekdays Header */}
        <div className="table-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        {/* Calendar Days */}
        <div className="table-content">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day === null ? 'empty' : ''} ${
                selectedDate.getDate() === day ? 'selected' : ''
              }`}
              onClick={() => day && handleDateSelection(new Date(year, month, day))}
            >
              <p className={day === new Date().getDate() ? 'current' : ''}>
                {day ? day : ''}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Form for Selected Date */}
      {selectedDate && (
        <div className="activity-form">
          <h4>Activities for {selectedDate.toLocaleDateString()}</h4>
          <div>
            <input
              type="text"
              value={newActivity}
              onChange={handleActivityChange}
              placeholder="Add a new activity"
            />
            <button onClick={handleAddActivity}>Add Activity</button>
          </div>

          <ul>
            {activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
