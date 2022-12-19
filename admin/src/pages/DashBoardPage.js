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
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";

import classes from "./asset/css/StandardMain.module.css";

import {
  viewByMonth,
  topComics,
  getTotalView,
  getTotalIncome,
} from "../store/actions/statisticAction.js";

import { getAllComic } from "../store/actions/comicAction";
import { getAllComicEP } from "../store/actions/comicEpAction";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const data = [
  { name: "Unpaid", value: 2000 },
  { name: "Paid", value: 3100 },
  { name: "Not Verified", value: 300 },
];

//FOR CHART CORLORS
const COLORS = ["#FF8042", "#0088FE", "#FFBB28", "#00C49F"];

//FOR PIE CHART
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} Users`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

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
  const [totalView, setTotalView] = React.useState();
  const [statisticData, setStatisticData] = React.useState();
  const [activeIndex, setActiveIndex] = React.useState(0); //FOR PIE CHART

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const fetchStatisticData = async () => {
    const totalView = setTotalView(
      unwrapResult(await dispatch(getTotalView()))
    ); // total view by day, month
    const totalComic = unwrapResult(dispatch(getAllComic()));
    const totalEpisode = unwrapResult(dispatch(getAllComicEP()));
    const totalIncome = unwrapResult(dispatch(getTotalIncome()));
    console.log(unwrapResult(dispatch(getTotalIncome())));
    setStatisticData({
      // viewByMonth: totalView.month,
      // viewByDay: totalView.today,
      totalComic: totalComic.length,
      totalEpisode: totalEpisode.length,
      totalIncome,
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
          title={"Comics/Episodes"}
          value={
            statisticData?.totalComic && statisticData.totalEpisode ? (
              `${statisticData.totalComic} / ${statisticData.totalEpisode}`
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
          title={"Views By Day/Month"}
          value={
            totalView ? (
              `${totalView.today} / ${totalView.month}`
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
          title={"Total Income Day/Month"}
          value={
            statisticData?.totalIncome ? (
              `${statisticData.totalIncome.today} / ${statisticData.totalIncome.month}`
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
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={""}>
            {/* <p className={classes.chart_title}>Pie Chart</p> */}
            <div className={classes.bar__container}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={200} height={200}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {" "}
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
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
