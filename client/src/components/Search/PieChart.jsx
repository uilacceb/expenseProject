import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js"


ChartJS.register(Tooltip, Legend, ArcElement);


const pieChartData = {
  labels: ["facebook", "youtube", "instagram"],
  datasets: [
    {
      label: "Time Spent",
      data: [120, 60, 140],
      backgroundColor: [
        "#3c474b",
        "#a4b8b1",
        "#535A53",

      ],
      borderColor: "transparent",
      hoverOffset: 4
    }
  ]
}

const PieChart = () => {

  const options = {};
  return (
    <Pie options={options} data={pieChartData} height={30} width={30}/>
  )
}

export default PieChart
