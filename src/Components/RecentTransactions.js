import React from 'react';
import './Styles/RecentTransactions.css';

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="recent-transactions">
      <h2 className="section-title">Recent Transactions</h2>
      <div className="transactions-list">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-date">{transaction.date}</span>
              <span className="transaction-category">{transaction.category}</span>
            </div>
            <span className="transaction-amount">₹{transaction.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;