import React from 'react';
import CalendarComponent from '../components/CalendarComponent';
import ChangeRequestList from '../components/ChangeRequestList';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Change Request Management</h1>
      {/* Calendar Section */}
      <CalendarComponent />

      {/* Change Requests Section */}
      <ChangeRequestList />
    </div>
  );
};

export default Dashboard;
