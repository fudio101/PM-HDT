import React, { useEffect } from "react";

import StatisticCard from "../components/layouts/statistic/StatisticCard";
import BarChart from "../components/charts/BarChart";

import classes from "./asset/css/StandardMain.module.css";
import LineChart from "../components/charts/LineChart";

const DashBoardPage = () => {
  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>DASHBOARD</p>
      </div>
      <div className={classes.info_cards}>
        <StatisticCard title={"Comic"} value={210} />
        <StatisticCard title={"User"} value={10} />
        <StatisticCard title={"Likes"} value={14212} />
        <StatisticCard title={"Views"} value={14212} />
      </div>
      <>
        <div className={classes.charts}>
          <div className={classes.charts_card}>
            <p className={classes.chart_title}>Top 5 Comic</p>
            <div id="bar-chart">
              <BarChart />
            </div>
          </div>

          <div className={classes.charts_card}>
            <p className={classes.chart_title}>User View</p>
            <div id="area_chart">
              <LineChart />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DashBoardPage;
