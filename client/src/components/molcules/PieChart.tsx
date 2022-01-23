import { memo } from "react";
import { Text } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Context } from "chartjs-plugin-datalabels";

import { Work } from "../../types/work";

export const PieChart = memo((props: { works: Work[] }) => {
  Chart.register(ChartDataLabels);
  const { works } = props;
  const workNames: string[] = [];
  const workTimes: number[] = [];
  works.forEach((work) => {
    workNames.push(work.workName);
    workTimes.push(work.totalTime);
  });

  const data = {
    labels: workNames,
    datasets: [
      {
        label: "勉強時間",
        data: workTimes,
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

  return (
    <>
      {works.length !== 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <Text>未完了のWorkがありません</Text>
      )}
    </>
  );
});
