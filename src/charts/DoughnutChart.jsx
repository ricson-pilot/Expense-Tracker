import React, { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../App.css"; // Assumes you have some app-wide styles.
import { DayInput } from "../atoms/DayInput";
import { MonthInput } from "../atoms/MonthlyInput";
import { YearInput } from "../atoms/YearlyInput";
import axios from "axios";
import API_BASE_URL from '../Components/apiConfig';

const PieChart = () => {
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [isYearSelected, setIsYearSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [expensesSummary, setExpensesSummary] = useState({ labels: [], datasets: [] });

  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        display: true,
        position: "top", // Position: "top", "left", "right", or "bottom"
        labels: {
          font: {
            size: 14, // Font size for the legend
            family: "'Arial', sans-serif", // Font family
            weight: "bold",
          },
          color: "#333", // Legend text color
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff", // Tooltip background color
        titleColor: "#000", // Tooltip title color
        bodyColor: "#555", // Tooltip body color
        borderWidth: 1,
        borderColor: "#ddd", // Tooltip border
        padding: 10,
      },
    },
    layout: {
      padding: {
        top: 8, // Add space around the chart
        bottom: 8,
        left: 8,
        right: 8,
      },
    },
    elements: {
      arc: {
        borderWidth: 2, // Border width for slices
        borderColor: "#fff", // Border color between slices
      },
    },
  };

  const fetchData = async (url, jwtToken) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log("API Response:", response.data); // Log the API response
      processExpensesData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    const today = new Date();
    let currentMonth = today.getMonth() + 1;
    if (currentMonth < 10) {
      currentMonth = "0" + currentMonth;
    }
    const currentYear = today.getFullYear();
    const date = `${currentYear}-${currentMonth}-${today.getDate()}`;
    fetchData(
      `${API_BASE_URL}/expenses/date-categoryWise?date=${encodeURIComponent(date)}`,
      jwtToken
    );
  }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    let url;
    if (isDaySelected) {
      url = `${API_BASE_URL}/expenses/date-categoryWise?date=${encodeURIComponent(selectedDate)}`;
    } else if (isMonthSelected) {
      console.log("Selected Month:", selectedMonth);
      console.log("Selected Year:", selectedYear);
      url = `${API_BASE_URL}/expenses/selectedMonth-categoryWise?year=${encodeURIComponent(selectedYear)}&month=${encodeURIComponent(selectedMonth)}`;
    } else if (isYearSelected) {
      url = `${API_BASE_URL}/expenses/year-categoryWise?year=${encodeURIComponent(selectedYear)}`;
    }

    if (url) {
      console.log("Fetching data from URL:", url);
      fetchData(url, jwtToken);
    }
  }, [isDaySelected, isMonthSelected, isYearSelected, selectedDate, selectedMonth, selectedYear]);

  const processExpensesData = (data) => {
    const categories = data.categories ||data.category || [];
    const expenses = data.expenses||data.total_expense || [];

    setExpensesSummary({
      labels: categories,
      datasets: [
        {
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

  const handleDayClick = () => {
    setIsDaySelected(true);
    setIsMonthSelected(false);
    setIsYearSelected(false);
  };

  const handleMonthClick = () => {
    setIsDaySelected(false);
    setIsMonthSelected(true);
    setIsYearSelected(false);
  };

  const handleYearClick = () => {
    setIsDaySelected(false);
    setIsMonthSelected(false);
    setIsYearSelected(true);
  };

  console.log("Expenses Summary:", expensesSummary);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: "300px", maxHeight: "300px", margin: "0 auto" }}>
        <Pie
          data={{
            ...expensesSummary,
            datasets: expensesSummary.datasets.map((dataset) => ({
              ...dataset,
              radius: "90%", // Reduce radius here
            })),
          }}
          options={options}
        />
      </div>
      <div>
        <button onClick={handleDayClick}>Day</button>
        <button onClick={handleMonthClick}>Month</button>
        <button onClick={handleYearClick}>Year</button>
      </div>
      <div>
        {isDaySelected && (
          <DayInput selectedDate={selectedDate} onDateChange={setSelectedDate} />
        )}
        {isMonthSelected && (
          <MonthInput
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        )}
        {isYearSelected && (
          <YearInput selectedYear={selectedYear} onYearChange={setSelectedYear} />
        )}
      </div>
    </div>
  );
};

export default PieChart;
