"use client";
import React, { useState, useEffect } from 'react';

const RealTimeClock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format the date and time
  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',

    hour12: true
  });

  return (
    <div className="clock-container">
      <div className="date">{formattedDate}</div>
      <div className="time">{formattedTime}</div>
    </div>
  );
};

export default RealTimeClock;