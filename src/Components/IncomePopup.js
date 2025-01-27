import React, { useState } from 'react';
import './Styles/IncomePopup.css';

const IncomePopup = ({ onClose, onSubmit }) => {
  const [income, setIncome] = useState('');

  const handleSubmit = () => {
    if (income) {
      onSubmit(income);
      onClose();
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