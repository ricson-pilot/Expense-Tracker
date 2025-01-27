import React, { useState, useEffect } from 'react';
import ExpenseTile from './ExpenseTile';
import './Styles/ExpenseBoxContainer.css';
import foodIcon from './Images/food.png';
import transportIcon from './Images/transportation_icon.png';
import entertainmentIcon from './Images/entertainment_icon.png';
import groceriesIcon from './Images/grocery_icon.png';
import utilitiesIcon from './Images/utilities_icon.png';
import healthcareIcon from './Images/healthcare_icon.png';
import educationIcon from './Images/education_icon.png';
import miscellaneousIcon from './Images/miscellaneous_icon.png';
import axios from 'axios';
import API_BASE_URL from './apiConfig';
// import ChartController from "../charts/charts";

const ExpenseBoxContainer = ({ onTileClick , reRender}) => {

  
  const [categoryWiseExpenses, setCategoryWiseExpenses] = useState({});

  useEffect(() => {
    const fetchCategoryWiseExpenses = async () => {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          throw new Error("No JWT token found in localStorage");
        }

        // Make the API call to the backend
        const response = await axios.get(
          `${API_BASE_URL}/expenses/currentMonth-categoryWise`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the request header
            },
          }
        );

        const categoriesForNewUser = {
          Utilities: 0,
          Education: 0,
          Groceries: 0,
          Healthcare: 0,
          Miscellaneous: 0,
          Transport: 0,
          Entertainment: 0,
          Food: 0,
        };

        const NormalisedMergedDate = { ...categoriesForNewUser, ...response.data }
        setCategoryWiseExpenses(NormalisedMergedDate);
        console.log("For card total by category: ",categoryWiseExpenses);
      } catch (err) {
        console.error("Error fetching category-wise expenses:", err);
      } 
    };

    fetchCategoryWiseExpenses();
  }, [reRender]);

  // const categories = ['Food', 'Transport', 'Entertainment', 'Groceries', 'Utilities', 'Healthcare', 'Education', 'Miscellaneous'];
  // const amounts = ['1500', '800', '1200', '2000', '500', '700', '1000', '300'];
  // const icons = [foodIcon, transportIcon, entertainmentIcon, groceriesIcon, utilitiesIcon, healthcareIcon, educationIcon, miscellaneousIcon]

  // const generateExpenses = (categories, amounts, icon) => {
  //   return categories.map((category, index) => ({
  //     icon: icons[index],
  //     categoryName: category,
  //     amount: amounts[index]
  //   }));
  // };

  // const expenses = generateExpenses(categories, amounts, foodIcon);


  console.log("=========For card total by category: ",categoryWiseExpenses);
  const categories = ['Food', 'Transport', 'Entertainment', 'Groceries', 'Utilities', 'Healthcare', 'Education', 'Miscellaneous'];
  const icons = [foodIcon, transportIcon, entertainmentIcon, groceriesIcon, utilitiesIcon, healthcareIcon, educationIcon, miscellaneousIcon];

  const transformExpenses = (categoryWiseExpenses, categories, icons) => {
    return Object.entries(categoryWiseExpenses).map(([category, amount]) => {
      const index = categories.findIndex(cat => cat.toLowerCase() === category.toLowerCase());
  
      return {
        icon: icons[index], 
        categoryName: categories[index],
        amount: amount.toFixed(2) 
      };
    });
  };
  
  const expenses = transformExpenses(categoryWiseExpenses, categories, icons);
  
  console.log(expenses);

  return (
    
    <div className="expense-box">
      <div className="expenses">
      {expenses.map((expense, index) => (
        <ExpenseTile
          key={index}
          icon={expense.icon}
          categoryName={expense.categoryName}
          amount={expense.amount}
          onClick={onTileClick}
        />
      ))}
      </div>
      {/* <ChartController/> */}
    </div>
  );
};

export default ExpenseBoxContainer;