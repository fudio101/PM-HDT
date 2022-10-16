import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./ComicDesc.module.css";

function ComicChapters() {
  return (
    <div className={classes.chapter_table}>
      <h3>Danh sách chương</h3>

      <div className={classes.sticky_table}>
        <table>
          <thead>
            <tr>
              <th>Chapter</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <NavLink className={classes.chapter_no} to={"/chapter"}>
                <td>Chương 1</td>
              </NavLink>
              <td>16/09/2022</td>
            </tr>

            <tr>
              <NavLink className={classes.chapter_no} to={"/chapter"}>
                <td>Chương 1</td>
              </NavLink>
              <td>16/09/2022</td>
            </tr>

            <tr>
              <NavLink className={classes.chapter_no} to={"/chapter"}>
                <td>Chương 1</td>
              </NavLink>
              <td>16/09/2022</td>
            </tr>

            <tr>
              <NavLink className={classes.chapter_no} to={"/chapter"}>
                <td>Chương 1</td>
              </NavLink>
              <td>16/09/2022</td>
            </tr>

            <tr>
              <NavLink className={classes.chapter_no} to={"/chapter"}>
                <td>Chương 1</td>
              </NavLink>
              <td>16/09/2022</td>
            </tr>

            <tr>
              <NavLink className={classes.chapter_no} to={"/chapter"}>
                <td>Chương 1</td>
              </NavLink>
              <td>16/09/2022</td>
            </tr>

            <tr>
              <NavLink className={classes.chapter_no} to={"/chapter"}>
                <td>Chương 1</td>
              </NavLink>
              <td>16/09/2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComicChapters;
