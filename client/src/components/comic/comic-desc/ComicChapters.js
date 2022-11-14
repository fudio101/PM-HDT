import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./ComicDesc.module.css";

function ComicChapters() {
  return (
    <div className={classes.chapter_table}>
      <h3>Episode List</h3>

      <div className={classes.sticky_table}>
        <table>
          <thead>
            <tr>
              <th>Chapter</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <NavLink className={classes.chapter_no} to={"/chapter"}>
                  episode 1
                </NavLink>
              </td>
              <td>16/09/2022</td>
            </tr>

            <tr>
              <td>
                <NavLink className={classes.chapter_no} to={"/chapter"}>
                  episode 2
                </NavLink>
              </td>
              <td>16/09/2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComicChapters;
