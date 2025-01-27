import React from 'react';

export const YearInput = ({ selectedYear, onYearChange }) => (
  <div>
    <label htmlFor="year">Choose a year:</label>
    <input
      type="number"
      id="year"
      value={selectedYear}
      onChange={(e) => onYearChange(e.target.value)}
      min="2015"
      max="2025"
    />
  </div>
);
