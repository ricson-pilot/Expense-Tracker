import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ExpenseBoxContainer from './ExpenseBoxContainer';
import './Styles/Home.css';
import incomeIcon from './Images/income_icon.png';
import expenseIcon from './Images/expense_icon.png';
import DetailsBox from './DetailsBox';
import Popup from './InputPopup';
import UserProfile from './UserProfile';
import RecentTransactions from './RecentTransactions';
import IncomePopup from './IncomePopup'; // Import the IncomePopup component

const Home = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [incomePopup, setIncomePopup] = useState(false);
  const [income, setIncome] = useState(10000);

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here
  };

  const handleIncomeSubmit = async (newIncome) => {
    setIncome(newIncome); // Update the income in the state

    // Make an API call to update the income in the backend
    try {
      const response = await fetch('/api/update-income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, income: newIncome }),
      });

      if (!response.ok) {
        throw new Error('Failed to update income');
      }

      const data = await response.json();
      console.log('Income updated successfully:', data);
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  const details = [
    { icon: incomeIcon, categoryName: 'Income', amount: income },
    { icon: expenseIcon, categoryName: 'Expense', amount: '800' },
    { icon: expenseIcon, categoryName: 'Avl. Balance', amount: '1200' },
  ];

  const transactionsData = [
    { date: '2023-10-01', category: 'Food', amount: 500 },
    { date: '2023-10-02', category: 'Transport', amount: 1200 },
    { date: '2023-10-03', category: 'Shopping', amount: 800 },
    { date: '2023-10-04', category: 'Entertainment', amount: 300 },
    { date: '2023-10-05', category: 'Utilities', amount: 500 },
    { date: '2023-10-06', category: 'Healthcare', amount: 700 },
  ];

  const handleTileClick = (categoryName) => {
    setSelectedCategory(categoryName); // Update the state with the selected category
    console.log('Selected Category in Home:', categoryName); // Log the selected category
  };

  return (
    <div className="main-page">
      <header className="top-bar">
        <div>
          <h1>Expense Tracker</h1>
          <h1>Hello {email}</h1>
        </div>
        <UserProfile userName="ricson jawahar1234656" onLogout={handleLogout} onIncomeClick={() => setIncomePopup(true)} />
      </header>
      <main className="content">
        <div className="details-container">
          {details.map((detail, index) => (
            <DetailsBox
              key={index}
              icon={detail.icon}
              categoryName={detail.categoryName}
              amount={detail.amount}
            />
          ))}
        </div>

        <ExpenseBoxContainer onTileClick={handleTileClick} />
        {selectedCategory && <p>You selected: {selectedCategory}</p>}

        <RecentTransactions transactions={transactionsData} />

        {showPopup && <Popup onClose={() => setShowPopup(false)} userEmail={email} />}
        {incomePopup && (
          <IncomePopup
            onClose={() => setIncomePopup(false)}
            onSubmit={handleIncomeSubmit}
          />
        )}
      </main>
      <button className="add-expense-button" onClick={() => setShowPopup(true)}>
        Add Expense
      </button>
    </div>
  );
};

export default Home;