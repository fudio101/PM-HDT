import React from "react";
import classes from "./HeaderSection.module.css";

function HeaderSection() {
  return (
    <header className={classes.header}>
      <div className={classes.menu_icon}>
        <span className="material-icons-outlined">menu</span>
      </div>
      <div className="header_left"></div>
      <div className="header_right">
        <span className="material-icons-outlined">account_circle</span>
      </div>
    </header>
  );
}

export default HeaderSection;
