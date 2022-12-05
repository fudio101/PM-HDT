import React, { useEffect } from "react";

import StatisticCard from "../components/layouts/statistic/StatisticCard";
import moment from "moment";

import SyncLoader from "react-spinners/SyncLoader";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import classes from "./asset/css/StandardMain.module.css";

import {
  viewByMonth,
  topComics,
  getTotalView,
} from "../store/actions/statisticAction.js";

import { getAllComic } from "../store/actions/comicAction";
import { getAllComicEP } from "../store/actions/comicEpAction";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const CustomizedLabel = (props) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const DashBoardPage = () => {
  const dispatch = useDispatch();

  const [topComicList, setTopComicList] = React.useState();
  const [viewByTime, setViewByMonth] = React.useState();
  const [statisticData, setStatisticData] = React.useState();

  const fetchStatisticData = async () => {
    const totalView = unwrapResult(await dispatch(getTotalView())); // total view by day, month
    const totalComic = unwrapResult(await dispatch(getAllComic()));
    const totalEpisode = unwrapResult(await dispatch(getAllComicEP()));
    // console.log(totalView);
    // console.log(totalComic.length);
    // console.log(totalEpisode.length);
    setStatisticData({
      viewByMonth: totalView.month,
      viewByDay: totalView.today,
      totalComic: totalComic.length,
      totalEpisode: totalEpisode.length,
    });
  };

  const fetchTopComicData = async () => {
    setTopComicList(unwrapResult(await dispatch(topComics())));
  };

  const fetchViewData = async () => {
    let limit = "";
    const start = moment().startOf("month");
    limit += `month1=${start.format("YYYY-MM")}&`;
    start.subtract(11, "month");
    limit += `month=${start.format("YYYY-MM")}`;
    setViewByMonth(unwrapResult(await dispatch(viewByMonth(limit))));
  };

  useEffect(() => {
    fetchTopComicData();
    fetchViewData();
    fetchStatisticData();
  }, []);

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>DASHBOARD</p>
      </div>
      <div className={classes.info_cards}>
        <StatisticCard
          title={"Comics"}
          value={
            statisticData?.totalComic ? (
              statisticData.totalComic
            ) : (
              <SyncLoader
                color="#46457a"
                loading
                size={10}
                speedMultiplier={0.7}
              />
            )
          }
        />
        <StatisticCard
          title={"Episodes"}
          value={
            statisticData?.totalEpisode ? (
              statisticData.totalEpisode
            ) : (
              <SyncLoader
                color="#46457a"
                loading
                size={10}
                speedMultiplier={0.7}
              />
            )
          }
        />
        <StatisticCard
          title={"Total Views Today"}
          value={
            statisticData?.viewByDay ? (
              statisticData.viewByDay
            ) : (
              <SyncLoader
                color="#46457a"
                loading
                size={10}
                speedMultiplier={0.7}
              />
            )
          }
        />
        <StatisticCard
          title={"Total Views This Month"}
          value={
            statisticData?.viewByMonth ? (
              statisticData.viewByMonth
            ) : (
              <SyncLoader
                color="#46457a"
                loading
                size={10}
                speedMultiplier={0.7}
              />
            )
          }
        />
      </div>
      <>
        <div className={classes.charts}>
          <div className={classes.charts_card}>
            <p className={classes.chart_title}>Top 5 Comics</p>
            <div className={classes.bar__container}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={700} height={500} data={topComicList}>
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip
                    wrapperStyle={{ width: "auto", backgroundColor: "#ccc" }}
                  />
                  <Legend
                  // width={100}
                  // wrapperStyle={{
                  //   top: 10,
                  //   right: 20,
                  //   backgroundColor: "#f5f5f5",
                  //   border: "1px solid #d5d5d5",
                  //   borderRadius: 3,
                  //   lineHeight: "40px",
                  // }
                  // }
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Bar dataKey="views" fill="#8884d8" barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={classes.charts_card}>
            <p className={classes.chart_title}>Views Last 12 Months</p>
            <div className={classes.bar__container}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={700} height={500} data={viewByTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" height={30} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    strokeWidth={2}
                    stroke="#8884d8"
                    label={<CustomizedLabel />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DashBoardPage;
