import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./VerticalBar.module.css";

function VerticalBar() {
  return (
    <aside className={classes.sidebar}>
      <div className={classes.sidebar_title}>
        <NavLink to={"/dashboard"} className={classes.sidebar_brand}>
          <span class="material-icons-outlined">inventory</span> Comics
        </NavLink>
        <span class="material-icons-outlined">close</span>
      </div>

      <ul className={classes.sidebar_list}>
        <NavLink to={"/dashboard"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">dashboard</span> Dashboard
        </NavLink>
        <NavLink to={"comic-manage"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">inventory_2</span> Comics
        </NavLink>
        <NavLink to={"category-manage"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">poll</span> Categories
        </NavLink>
        <NavLink to={"user-manage"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">settings</span> Users
        </NavLink>
      </ul>
    </aside>
  );
}

export default VerticalBar;
