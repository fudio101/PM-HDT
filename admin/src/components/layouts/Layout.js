import React from "react";

import HeaderSection from "./header/HeaderSection";
import VerticalBar from "./vertical-bar/VerticalBar";
import HashLoader from "react-spinners/HashLoader";
// import Spinner from "../UI/Spinner";
import { usePromiseTracker } from "react-promise-tracker";

import classes from "./Layouts.module.css";
import { Outlet } from "react-router-dom";

function Layout() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <section className="flex  h-screen">
      <VerticalBar />
      {/* <HeaderSection /> */}
      <div className="md:overflow-x-hidden m-3  w-full overflow-auto">
        <div
          className={`${promiseInProgress ? classes.spinner__active : ""} ${
            classes.spinner__wrapper
          }`}
        >
          <div className={classes.spinner}>
            <HashLoader color="#495c83" />
          </div>
        </div>
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
