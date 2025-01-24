import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="header">
        <button onClick={() => navigate('/login')} className="header-button">Login</button>
        <button onClick={() => navigate('/signup')} className="header-button">Signup</button>
      </div>
      <div className="content">
        <h1>Expense Tracker</h1>
        <p className="tagline">Track your expenses effortlessly and efficiently</p>
      </div>
    </div>
  );
};

export default HomePage;