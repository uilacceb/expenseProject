import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title, plugins } from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(Tooltip, Legend, Title, Legend, ArcElement);

const PieChart = ({ expenses }) => { // Receive expenses as a prop
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);

  const colorPalette = [
    // "#333B46",
    // "#EDEFE6",
    // "#485A66",
    // "#92A7B1",
    // "#C1B39E",
    // "#767570",
    // "#919799",
    // "#3D3C4C",
    // "#4C5A63",
    // "#C2DFE3",
    // "#9DB4C0",
    // "#5C6B73",
    // "#253237"

    //more colorful
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#d9d9d9',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f'
  ];

  useEffect(() => {
    if (!expenses || expenses.length === 0) {
      setLabels([]);
      setData([]);
      setBackgroundColors([]);
      return;
    }

    // Extract unique categories
    const distinctCategories = [...new Set(expenses.map(expense => expense.category))]
      .filter(category => category !== "Income");
    setLabels(distinctCategories);

    // Sum expenses per category
    const categoryTotals = distinctCategories.map(category => {
      return Math.abs(
        expenses
          .filter(expense => expense.category === category)
          .reduce((sum, expense) => sum + (parseFloat(expense.amount) || 0), 0)
      );
    });
    setData(categoryTotals);

    // Assign colors dynamically

    setBackgroundColors(colorPalette);

  }, [expenses]);

  const pieChartData = {
    labels,

    datasets: [{
      label: "Expenses by Category",
      Title: "display",
      data,
      backgroundColor: backgroundColors,
      borderColor: "transparent",
      hoverOffset: 4
    }]
  };

  const options = {
    responsiveness: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Expense spent in category",
       
      }
    }
  }

  return <Pie options={options} data={pieChartData} />;
};

export default PieChart;

