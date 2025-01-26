import React, { useState } from 'react';
import './Styles/IncomePopup.css'; // Add CSS for styling the popup

const IncomePopup = ({ onClose, onSubmit }) => {
  const [income, setIncome] = useState('');

  const handleSubmit = () => {
    if (income) {
      onSubmit(income); // Pass the new income to the parent component
      onClose(); // Close the popup
    } else {
      alert('Please enter a valid income.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Enter Your Income</h2>
        <input
          type="number"
          placeholder="Enter income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default IncomePopup;