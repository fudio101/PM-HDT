import React from "react";

import StatisticCard from "../components/layouts/statistic/StatisticCard";

import classes from "./StandardMain.module.css";

function DashBoardPage() {
  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>DASHBOARD</p>
      </div>
      <div className={classes.main_cards}>
        <StatisticCard title={"likes"} value={14212} />
        <StatisticCard title={"likes"} value={14212} />
        <StatisticCard title={"likes"} value={14212} />
        <StatisticCard title={"likes"} value={14212} />{" "}
      </div>
    </>
  );
}

export default DashBoardPage;
