import React from 'react';

export const MonthInput = ({ selectedMonth, onMonthChange, selectedYear, onYearChange }) => (
  <div>
    <label htmlFor="month">Choose a month:</label>
    <input
      type="month"
      id="month"
      value={`${selectedYear}-${selectedMonth.padStart(2, '0')}`}
      onChange={(e) => {
        const [year, month] = e.target.value.split('-');
        onMonthChange(month);
        onYearChange(year);
      }}
    />
  </div>
);
