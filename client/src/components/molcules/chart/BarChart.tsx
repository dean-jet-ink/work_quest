import { memo } from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = memo((props: { value: Array<number> }) => {
  const { value } = props;
  const data = {
    labels: ["今日", "昨日", "一昨日"],
    datasets: [
      {
        label: "勉強時間",
        data: value,
        backgroundColor: ["orange", "#a5a5a5", "#a5a5a5"],
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "bar",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#000",
        font: {
          size: 15,
          weight: "bold",
        },
        formatter: (value: number) => {
          return `${value}h`;
        },
      },
    },
    scales: {
      xAxis: {
        ticks: {
          display: false,
        },
      },
      yAxis: {
        ticks: {
          color: "white",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    indexAxis: "y",
  };

  return <Bar data={data} options={options} />;
});
