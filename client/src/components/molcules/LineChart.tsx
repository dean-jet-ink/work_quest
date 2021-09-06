import { memo } from "react";
import { Line } from "react-chartjs-2";

export const LineChart = memo((props: { value: Array<number> }) => {
  const { value } = props;
  const data = {
    labels: ["月", "火", "水", "木", "金", "土", "日"],
    datasets: [
      {
        label: "勉強時間",
        data: value,
        backgroundColor: "orange",
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    type: "line",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        grid: {
          color: "#636363",
        },
        ticks: {
          color: "white",
        },
      },
      yAxis: {
        grid: {
          color: "#636363",
        },
        ticks: {
          color: "white",
          display: true,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
});
