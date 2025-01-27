import React from 'react';
import CalendarComponent from './components/CalendarComponent';
import NavigationBar from './navigationBar/NavigationBar';
import './App.css';

function App() {
  return (
    <NavigationBar>
      <CalendarComponent />
    </NavigationBar>
  );
}

export default App;
