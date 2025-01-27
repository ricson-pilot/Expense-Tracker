import React from 'react';

export const DayInput = ({ selectedDate, onDateChange }) => (
  <div>
    <label htmlFor="date">Choose a date:</label>
    <input
      type="date"
      id="date"
      value={selectedDate}
      onChange={(e) => onDateChange(e.target.value)}
    />
  </div>
);
