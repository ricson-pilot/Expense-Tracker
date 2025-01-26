import React from 'react';
import './Styles/DetailsBox.css';

const DetailsBox = ({ icon, categoryName, amount }) => {
  return (
    <div className="details-tile">
      <div className="icon-category">
        <img src={icon} alt={`${categoryName} icon`} className="icon" />
        <h3 className="details-name">{categoryName}</h3>
      </div>
      <div className="amount-container">
        <p className="amount">₹{amount}</p>
      </div>
    </div>
  );
};

export default DetailsBox;