import { memo } from "react";
import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";

import { Week } from "../../../types/week";

type Props = {
  week: Week;
  myWeek?: Week;
};

export const LineChart = memo((props: Props) => {
  const { week, myWeek } = props;
  const alignWeek = [
    week.monday,
    week.tuesday,
    week.wednesday,
    week.thursday,
    week.friday,
    week.saturday,
    week.sunday,
  ];
  const alignMyWeek: number[] = [];
  if (myWeek) {
    alignMyWeek.push(
      myWeek.monday,
      myWeek.tuesday,
      myWeek.wednesday,
      myWeek.thursday,
      myWeek.friday,
      myWeek.saturday,
      myWeek.sunday
    );
  }

  const data = {
    labels: ["月", "火", "水", "木", "金", "土", "日"],
    datasets: [
      {
        label: "勉強時間",
        data: alignWeek,
        backgroundColor: "orange",
        borderColor: "orange",
        borderWidth: 1,
      },
      {
        label: "自分の勉強時間",
        data: alignMyWeek,
        backgroundColor: "#d5d5d5",
        borderColor: "#d5d5d5",
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

  return (
    <Box border="1px solid white" py={3} px={5}>
      <Line data={data} options={options} />
    </Box>
  );
});
