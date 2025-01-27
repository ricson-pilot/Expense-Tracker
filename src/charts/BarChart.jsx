import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { YearInput } from "../atoms/YearlyInput";
import axios from 'axios';
import "../App.css";
import API_BASE_URL from '../Components/apiConfig';

const BarChart = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [expensesSummary, setExpensesSummary] = useState({
    labels: [],
    datasets: [],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#555",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
      },
    },
    layout: {
      padding: {
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: "#333",
          font: {
            size: 14,
          },
          beginAtZero: true,
        },
      },
    },
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    const fetchData = async () => {
      if (selectedYear) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/expenses/year-categoryWise?year=${encodeURIComponent(selectedYear)}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the request header
              },
            }
          );
          console.log("API Response:", response.data); // Log the API response
          processExpensesData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedYear]);

  const processExpensesData = (data) => {
    const categories = data.categories || [];
    const expenses = data.expenses || [];

    setExpensesSummary({
      labels: categories,
      datasets: [
        {
          label: `Expenses for ${selectedYear}`,
          data: expenses,
          backgroundColor: categories.map(
            () =>
              `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, 0.6)`
          ),
          borderWidth: 1,
        },
      ],
    });
  };

  const handleChooseYearClick = () => {
    setSelectedYear("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: "600px", maxHeight: "1000px", margin: "0 auto" }}>
        <Bar data={expensesSummary} options={options} />
      </div>
      <div>
        <button onClick={handleChooseYearClick}>Choose Year</button>
      </div>
      <div>
        <YearInput selectedYear={selectedYear} onYearChange={setSelectedYear} />
      </div>
    </div>
  );
};

export default BarChart;
