import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ transactions }) => {
  const categories = transactions.reduce((acc, transaction) => {
    acc[transaction.Category] = (acc[transaction.Category] || 0) + transaction.Amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Transactions by Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;