import React from "react";

import { MdAdminPanelSettings } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { AiFillBook } from "react-icons/ai";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import { FaFeatherAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import classes from "./VerticalBar.module.css";

function VerticalBar() {
  return (
    <aside className={classes.sidebar}>
      <div className={classes.sidebar_title}>
        <NavLink to={"/dashboard"} className={classes.sidebar_brand}>
          <span className="material-icons-outlined">
            <MdAdminPanelSettings />
          </span>{" "}
          Comics
        </NavLink>
        <span className="material-icons-outlined">close</span>
      </div>

      <ul className={classes.sidebar_list}>
        <NavLink to={"/dashboard"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">
            <RiDashboard2Fill />
          </span>{" "}
          Dashboard
        </NavLink>
        <NavLink to={"comic-manage"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">
            <AiFillBook />
          </span>{" "}
          Comics
        </NavLink>
        <NavLink to={"category-manage"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">
            <BiCategoryAlt />
          </span>{" "}
          Categories
        </NavLink>
        <NavLink to={"user-manage"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">
            <BiUser />
          </span>{" "}
          Users
        </NavLink>
        <NavLink to={"author-manage"} className={classes.sidebar_list_item}>
          <span className="material-icons-outlined">
            <FaFeatherAlt />
          </span>{" "}
          Author
        </NavLink>
      </ul>
    </aside>
  );
}

export default VerticalBar;
