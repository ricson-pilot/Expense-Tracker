import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpenseBoxContainer from './ExpenseBoxContainer';
import './Styles/Home.css';
import API_BASE_URL from './apiConfig';
import incomeIcon from './Images/income_icon.png';
import expenseIcon from './Images/expense_icon.png';
import DetailsBox from './DetailsBox';
import Popup from './InputPopup';
import UserProfile from './UserProfile';
import RecentTransactions from './RecentTransactions';
import IncomePopup from './IncomePopup'; // Import the IncomePopup component
import axios from 'axios';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, expenseLimitTemporaryVariable, name } = location.state || {};

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [incomePopup, setIncomePopup] = useState(false);
  const [expenseLimit, setExpenseLimit] = useState(expenseLimitTemporaryVariable);
  const [transactionsData, setTransactionsData] = useState([]);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentMonthExpenses = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log("Token is: ", token);

        if (!token) {
          throw new Error("No JWT token found in localStorage");
        }

        const response = await axios.get(
          `${API_BASE_URL}/expenses/current-month-expenses`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the request header
            },
          }
        );

        console.log("API Response:", response.data);
        let filteredData;
        if (selectedCategory === "All") {
          // If category is "All", keep all the data
          filteredData = response.data;
        } else {
          // Otherwise, filter the data to include only matching categories
          filteredData = response.data.filter(
            (transaction) => transaction.category === selectedCategory
          );
        }
        setTransactionsData(filteredData);
      } catch (err) {
        console.error("Error fetching current month expenses:", err);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentMonthExpenses();

  }, [selectedCategory, showPopup]); // Re-run the effect when selectedCategory changes


  useEffect(()=>{
    // code to change expense ecah time the amount changes
    const fetchMonthTotal = async () => {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          throw new Error("No JWT token found in localStorage");
        }

        // Make the API call to the backend
        const response = await axios.get(
          `${API_BASE_URL}/expenses/month-total`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the request header
            },
          }
        );

        // Extract the "month-total" value from the response
        const total = response.data["month-total"];

        // Set the month total to the state
        setExpense(total);
      } catch (err) {
        console.error("Error fetching month total expenses:", err);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };
    // Call the function to fetch data
    fetchMonthTotal();

  },[showPopup]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    console.log('User logged out');
    navigate('/login');

    // Add your logout logic here
  };

  const handleIncomeSubmit = async (newIncome) => {

    // Make an API call to update the income in the backend       // ------------------ Not done......
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
      setExpenseLimit(newIncome);
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  const details = [
    { icon: incomeIcon, categoryName: 'Income', amount: (expenseLimit ?? 0).toFixed(2) },
    { icon: expenseIcon, categoryName: 'Expense', amount: (expense ?? 0).toFixed(2) },
    { icon: expenseIcon, categoryName: 'Avl. Balance', amount: ((expenseLimit - expense) ?? 0).toFixed(2) }
  ];

  const handleTileClick = (categoryName) => {
    setSelectedCategory(categoryName); // Update the state with the selected category
    console.log('Selected Category in Home:', categoryName); // Log the selected category
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-page">
      <header className="top-bar">
        <div>
          <h1>Hello {name}</h1>
          <h1>Wallet Watch</h1>
        </div>
        <UserProfile userName={email} onLogout={handleLogout} onIncomeClick={() => setIncomePopup(true)} />
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

        <ExpenseBoxContainer onTileClick={handleTileClick} reRender={showPopup} />
        {/* {selectedCategory && <p>You selected: {selectedCategory}</p>} */}

        <RecentTransactions transactions={transactionsData} selectedCategory={selectedCategory}/>

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