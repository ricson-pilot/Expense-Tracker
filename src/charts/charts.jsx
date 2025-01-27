import  BarChart  from "./BarChart";
import  PieChart  from "./DoughnutChart";
import sourceData from "../data/sourceData.json";
import { useState, useEffect } from "react";
import LineChart from "./LineChart";
const categories = ["transport", "food", "entertainment", "groceries", "rent", "utilities", "shopping"];
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

function Charts() {
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [isYearSelected, setIsYearSelected] = useState(false);
  const [isWeeklySelected, setIsWeeklySelected] = useState(false);
  const [expensesSummary, setExpensesSummary] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch with a timeout
    setTimeout(() => {
      setLoading(false); // Set loading to false after simulating a delay
    }, 1000); // Simulating a 1-second delay for data loading
  }, []);

  useEffect(() => {
    if (!sourceData) {
      console.error("sourceData is undefined or null");
      return;
    }

    if (!sourceData.monthly_expenses || !Array.isArray(sourceData.monthly_expenses)) {
      console.error("sourceData.monthly_expenses is undefined, null, or not an array");
      return;
    }

    if (isMonthSelected && !loading) {
      const monthlyExpenses = sourceData.monthly_expenses;
      if (!monthlyExpenses.length) {
        console.error("No monthly expenses data available.");
        setExpensesSummary({ labels: [], datasets: [] });
        return;
      }

      const labels = monthlyExpenses.map(month => month.month);
      let categoryWiseExpenses = categories.reduce((acc, category) => {
        acc[category] = new Array(12).fill(0);
        return acc;
      }, {});

      for (const monthExpense of monthlyExpenses) {
        for (const expense of monthExpense.expenses) {
          categoryWiseExpenses[expense.category][months[monthExpense.month] - 1] += expense.amount;
        }
      }

      const datasets = Object.entries(categoryWiseExpenses).map(([label, data]) => ({ label, data }));

      console.log({ labels, datasets });
      setExpensesSummary({ labels, datasets });
    }
  }, [isMonthSelected, isYearSelected, isWeeklySelected, loading]);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        <div>
          <PieChart expensesSummary={expensesSummary} />
          <button onClick={() => { setIsMonthSelected(true); setIsWeeklySelected(false); setIsYearSelected(false); }}>Month</button>
          <button onClick={() => { setIsMonthSelected(false); setIsWeeklySelected(true); setIsYearSelected(false); }}>Weekly</button>
          <button onClick={() => { setIsMonthSelected(false); setIsWeeklySelected(false); setIsYearSelected(true); }}>Year</button>
        </div>
          <BarChart expensesSummary={expensesSummary} />
      </div>
      <div>
        
      </div>
    </>
  );
}


const ChartController=()=>{
  const [isPieChartActivated, setIsPieChartActivated] = useState(false);
  const [isBarChartActivated, setIsBarChartActivated] = useState(false);
  const [isLineChartActivated, setIsLineChartActivated] = useState(false);

  const handleChartSwitch=(chart)=>{
    if(chart==0){
      setIsPieChartActivated(true);
      setIsBarChartActivated(false);
      setIsLineChartActivated(false);
    }
    else if(chart==1){
      setIsPieChartActivated(false);
      setIsBarChartActivated(true);
      setIsLineChartActivated(false);
    }
    else if(chart==2){
      setIsPieChartActivated(false);
      setIsBarChartActivated(false);
      setIsLineChartActivated(true);
    }
  }
  
  return(
    <div>
    {isPieChartActivated==false && isBarChartActivated==false &&  
    isLineChartActivated==false ? <div>
      <button onClick={()=>handleChartSwitch(0)}>PieChart</button>
      <button onClick={()=>handleChartSwitch(1)}>BarChart</button>
      <button onClick={()=>handleChartSwitch(2)}>LineChart</button>
    </div>:
    <div>
    <div style={{display:"flex", justifyContent:"space-around", height:"400px"}}>
      {isPieChartActivated && <PieChart data={sourceData}/>}
      {isBarChartActivated && <BarChart data={sourceData}/>}
      {isLineChartActivated && <LineChart data={sourceData}/>}
    </div>
    <div>
      <button onClick={()=>handleChartSwitch(0)}>PieChart</button>
      <button onClick={()=>handleChartSwitch(1)}>BarChart</button>
      <button onClick={()=>handleChartSwitch(2)}>LineChart</button>
    </div>
    </div>
}
  </div>
  )
}

export default ChartController;