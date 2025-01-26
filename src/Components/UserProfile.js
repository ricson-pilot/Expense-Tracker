import React, { useState } from 'react';
import './Styles/UserProfile.css';
import userIcon from './Images/profile_icon.png';

const UserProfile = ({ userName, onLogout, onIncomeClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="user-profile">
      <img src={userIcon} alt="User Icon" className="user-icon" />
      <span className="user-name">{userName}</span>
      <button className="dropdown-arrow" onClick={toggleDropdown}>
        ▼
      </button>
      {showDropdown && (
        <div className="dropdown-menu">
          <button onClick={onLogout}>Logout</button>
          <button onClick={onIncomeClick}>Change Income</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;