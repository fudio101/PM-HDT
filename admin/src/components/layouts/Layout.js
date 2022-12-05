import React from "react";

import HeaderSection from "./header/HeaderSection";
import VerticalBar from "./vertical-bar/VerticalBar";

import Spinner from "../UI/Spinner";
import { usePromiseTracker } from "react-promise-tracker";

import classes from "./Layouts.module.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className={classes.grid_container}>
      <HeaderSection />
      <VerticalBar />
      <div className={classes.main_container}>
        <Outlet />
        {<Spinner />}
      </div>
    </div>
  );
}

export default Layout;
