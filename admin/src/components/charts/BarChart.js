import React from "react";

import ResizableBox from "./wrapper-chart/ResizableBox";
import { Chart } from "react-charts";

function BarChart() {
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          {
            primary: "30 Ngày",
            secondary: 100,
          },
          {
            primary: "Naruto Full Màu",
            secondary: 180,
          },
          {
            primary: "Ta Là Tà Đế",
            secondary: 90,
          },
          {
            primary: "Vua Thăng Cấp",
            secondary: 150,
          },
          {
            primary: "Home Room",
            secondary: 60,
          },
        ],
      },
    ],
    []
  );

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );
  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <>
      {/* <button onClick={randomizeData}>Randomize Data</button> */}
      <br />
      <br />
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}

export default BarChart;
