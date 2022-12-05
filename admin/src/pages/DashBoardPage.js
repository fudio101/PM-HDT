import React, { useEffect } from "react";

import StatisticCard from "../components/layouts/statistic/StatisticCard";
import moment from "moment";

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

import { viewByMonth, topComics } from "../store/actions/statisticAction.js";
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
  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];
  const [topComicList, setTopComicList] = React.useState();
  const [viewByTime, setViewByMonth] = React.useState();

  const getViewsList = () => {
    let limit = "";
    const start = moment().startOf("month");
    for (let i = 0; i < 12; i++) {
      if (i === 0) {
        limit += `month=${start.format("YYYY-MM")}&`;
      } else {
        limit += `month${i}=${start.format("YYYY-MM")}&`;
      }
      start.subtract(1, "month");
    }

    console.log(limit);
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
    // getViewsList();
    // console.log();
  }, []);
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
