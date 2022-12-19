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
  getUserStatistic,
  getTotalIncomeByMonth,
  getPackageSold,
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
const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#F00000", "#FF8042"];

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

// const CustomizedLabel = (props) => {
//   const { x, y, stroke, value } = props;
//   return (
//     <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
//       {value}
//     </text>
//   );
// };

const DashBoardPage = () => {
  const dispatch = useDispatch();

  const [topComicList, setTopComicList] = React.useState();
  // const [viewByTime, setViewByMonth] = React.useState();
  const [totalView, setTotalView] = React.useState();
  const [totalComic, setTotalComic] = React.useState();
  const [totalEpisode, setTotalEpisode] = React.useState();
  const [totalIncome, setTotalIncome] = React.useState();
  const [userStatistic, setUserStatistic] = React.useState();
  const [totalAccount, setTotalAccount] = React.useState();
  const [totalViewAndIncomeByMonth, setTotalViewAndIncomeByMonth] =
    React.useState();
  const [packageTypeSold, setPackageTypeSold] = React.useState();

  const [activeIndex, setActiveIndex] = React.useState(0); //FOR PIE CHART

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const fetchUserStatistic = async () => {
    const res = unwrapResult(await dispatch(getUserStatistic()));
    let accounts = 0;
    let arr = [];
    for (const [key, value] of Object.entries(res)) {
      accounts += value;
      key === "not_verified"
        ? arr.push({ name: "not verified", value: value })
        : arr.push({ name: key, value: value });
    }
    setTotalAccount(accounts);
    setUserStatistic(arr);
  };

  const fetchPackageSold = async () => {
    setPackageTypeSold(unwrapResult(await dispatch(getPackageSold())));
  };
  const fetchTotalView = async () => {
    setTotalView(unwrapResult(await dispatch(getTotalView()))); // total view by day, month
  };
  const fetchTotalIncome = async () => {
    setTotalIncome(unwrapResult(await dispatch(getTotalIncome())));
  };

  const fetchAllComic = async () => {
    setTotalComic(unwrapResult(await dispatch(getAllComic())));
  };

  const fetchTopComicData = async () => {
    setTopComicList(unwrapResult(await dispatch(topComics())));
  };

  const fetchAllComicEpisode = async () => {
    setTotalEpisode(unwrapResult(await dispatch(getAllComicEP())));
  };

  const fetchViewData = async () => {
    let limit = "";
    const start = moment().startOf("month");
    limit += `month1=${start.format("YYYY-MM")}&`;
    start.subtract(11, "month");
    limit += `month=${start.format("YYYY-MM")}`;

    const views = unwrapResult(await dispatch(viewByMonth(limit)));
    const income = unwrapResult(await dispatch(getTotalIncomeByMonth(limit)));

    let arr = [];
    views.forEach((element, index) => {
      element.income = income[index].income;
      arr.push(element);
    });
    // for (const [key, value] of Object.entries(views)) {
    //   key === "not_verified"
    //     ? arr.push({ name: "not verified", value: value })
    //     : arr.push({ name: key, value: value });
    // }
    // console.log("res", arr);
    setTotalViewAndIncomeByMonth(arr);
    // setUserStatistic(arr);
  };

  useEffect(() => {
    fetchTopComicData();
    fetchViewData();
    fetchAllComicEpisode();
    fetchAllComic();
    fetchTotalIncome();
    fetchTotalView();
    fetchUserStatistic();
    fetchPackageSold();
  }, []);

  // console.log("total Comic", totalComic);
  // console.log("Total income", totalIncome);

  // useEffect(() => {}, [userStatistic]);

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>DASHBOARD</p>
      </div>
      <div className={classes.info_cards}>
        <StatisticCard
          title={"Comics/Episodes"}
          value={
            totalComic && totalEpisode ? (
              `${totalComic.length} / ${totalEpisode.length}`
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
            totalIncome ? (
              `${new Intl.NumberFormat("VND", {
                maximumSignificantDigits: 3,
              }).format(totalIncome.today)} / ${new Intl.NumberFormat("VND", {
                maximumSignificantDigits: 3,
              }).format(totalIncome.month)}`
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
          title={"Accounts"}
          value={
            totalAccount ? (
              totalAccount
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
                  <Bar dataKey="views" fill="#8884d8" barSize={60}>
                    {topComicList?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={classes.charts_card}>
            <p className={classes.chart_title}>User Statistic</p>
            <div className={classes.bar__container}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={200} height={200}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={userStatistic}
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
        </div>
        <div className={classes.charts2}>
          <div className={classes.charts_card}>
            <p className={classes.chart_title}>
              Subscription Package Statistic
            </p>
            <div className={classes.bar__container}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={200} height={200}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={packageTypeSold}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="total"
                    onMouseEnter={onPieEnter}
                  >
                    {" "}
                    {packageTypeSold?.map((entry, index) => (
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
            <p className={classes.chart_title}>Views-Income Last 12 Months</p>
            <div className={classes.bar__container}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={totalViewAndIncomeByMonth}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />

                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="views"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="income"
                    stroke="#82ca9d"
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
