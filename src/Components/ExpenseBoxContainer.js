import React, { useState } from 'react';
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

const ExpenseBoxContainer = ({ onTileClick }) => {

  const categories = ['Food', 'Transport', 'Entertainment', 'Groceries', 'Utilities', 'Healthcare', 'Education', 'Miscellaneous'];
  const amounts = ['1500', '800', '1200', '2000', '500', '700', '1000', '300'];
  const icons = [foodIcon, transportIcon, entertainmentIcon, groceriesIcon, utilitiesIcon, healthcareIcon, educationIcon, miscellaneousIcon]

  const generateExpenses = (categories, amounts, icon) => {
    return categories.map((category, index) => ({
      icon: icons[index],
      categoryName: category,
      amount: amounts[index]
    }));
  };

  const expenses = generateExpenses(categories, amounts, foodIcon);


  return (
    
    <div className="expense-box">
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
  );
};

export default ExpenseBoxContainer;