import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import API_BASE_URL from '../Components/apiConfig';
import { MonthInput } from "../atoms/MonthlyInput"; // Assuming this is the component for month/year selection
import sourceData from "../data/sourceData.json"; // JSON data source

const months = {
    "JANUARY": 1,
    "FEBRUARY": 2,
    "MARCH": 3,
    "APRIL": 4,
    "MAY": 5,
    "JUNE": 6,
    "JULY": 7,
    "AUGUST": 8,
    "SEPTEMBER": 9,
    "OCTOBER": 10,
    "NOVEMBER": 11,
    "DECEMBER": 12
  };
  
const processDataForLineChart = (data, selectedMonth, selectedYear) => {
  const dailyExpenses = {};

  data.monthly_expenses.forEach((monthExpense) => {
    if (
      monthExpense.month === Object.keys(months)[selectedMonth - 1].toUpperCase() &&
      new Date(monthExpense.expenses[0].date).getFullYear() === parseInt(selectedYear)
    ) {
      monthExpense.expenses.forEach((expense) => {
        const date = new Date(expense.date).getDate(); // Get the day of the month
        dailyExpenses[date] = (dailyExpenses[date] || 0) + expense.amount;
      });
    }
  });

  return dailyExpenses;
};

const LineChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(""); // Selected month
  const [selectedYear, setSelectedYear] = useState(""); // Selected year
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const dailyData = processDataForLineChart(
        sourceData,
        parseInt(selectedMonth),
        selectedYear
      );

      setLineChartData({
        labels: Object.keys(dailyData).map((day) => `Day ${day}`),
        datasets: [
          {
            label: "Daily Expenses",
            data: Object.values(dailyData),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    }
  }, [selectedMonth, selectedYear]);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2>Line Chart: Daily Expenses</h2>
      <MonthInput
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      {selectedMonth && selectedYear ? (
        <Line
          data={lineChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#555",
                  font: {
                    size: 14,
                  },
                },
              },
              y: {
                ticks: {
                  color: "#555",
                  font: {
                    size: 14,
                  },
                  beginAtZero: true,
                },
              },
            },
          }}
        />
      ) : (
        <p>Please select a month and year to view the chart.</p>
      )}
    </div>
  );
};

export default LineChart;
