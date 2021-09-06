import { memo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Context } from "chartjs-plugin-datalabels";

export const PieChart = memo((props: { value: Array<number> }) => {
  Chart.register(ChartDataLabels);
  const { value } = props;
  const works = ["ポートフォリオ作成", "デザイン作成", "マーケティング学習"];
  const data = {
    labels: works,
    datasets: [
      {
        label: "勉強時間",
        data: value,
        backgroundColor: ["#f87979", "#aa4c8f", "#38b48b"],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    type: "pie",
    cutout: "50%",
    responsive: true,
    scales: {
      xAxes: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 30,
        right: 30,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "white",
        textAlign: "center",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value: number, ctx: Context) => {
          const label = ctx.chart.data.labels![ctx.dataIndex];
          return `${label}\n${value}時間`;
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
});
