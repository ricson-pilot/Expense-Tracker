import React from 'react';
import './Styles/ExpenseTile.css';

const ExpenseTile = ({ icon, categoryName, amount, onClick }) => {
  return (
    <div className="expense-tile" onClick={() => onClick(categoryName)}>
      <div className="icon-category">
        <img src={icon} alt={`${categoryName} icon`} className="icon" />
        <h3 className="category-name">{categoryName}</h3>
      </div>
      <div className="amount-container">
        <p className="amount">₹{amount}</p>
      </div>
    </div>
  );
};

export default ExpenseTile;