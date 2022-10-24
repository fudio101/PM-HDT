import React from "react";

import classes from "./VerticalBar.module.css";

function VerticalBar() {
  return (
    <aside className={classes.sidebar}>
      <div className={classes.sidebar_title}>
        <div className={classes.sidebar_brand}>
          <span class="material-icons-outlined">inventory</span> Comics
        </div>
        <span class="material-icons-outlined">close</span>
      </div>

      <ul className={classes.sidebar_list}>
        <li className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">dashboard</span> Dashboard
        </li>
        <li className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">inventory_2</span> Document
        </li>
        <li className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">poll</span> Reports
        </li>
        <li className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">settings</span> Settings
        </li>
      </ul>
    </aside>
  );
}

export default VerticalBar;
