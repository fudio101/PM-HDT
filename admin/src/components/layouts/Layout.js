import React from "react";

import HeaderSection from "./header/HeaderSection";
import VerticalBar from "./vertical-bar/VerticalBar";

import classes from "./Layouts.module.css";

function Layout(props) {
  return (
    <div className={classes.grid_container}>
      <HeaderSection />
      <VerticalBar />
      <div className={classes.main_container}>{props.children}</div>
    </div>
  );
}

export default Layout;
