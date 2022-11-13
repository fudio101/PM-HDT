import React from "react";
import classes from "./ComicItem.module.css";
import { NavLink } from "react-router-dom";

function ComicItem(props) {
  return (
    <div className={classes.post_item}>
      <div className={classes.post_media}>
        <img
          src={props.comic.image}
          alt="something went wrong"
          className={classes.post_image}
        />
      </div>
      <div className={classes.post_info}>
        {props.comic.categories.map((cate, index) => {
          return (
            <div className={classes.post_category} key={index}>
              {cate}
            </div>
          );
        })}
        <NavLink to={"/comic"}>
          <div className={classes.post_title}>{props.comic.name}</div>
        </NavLink>
        <p className={classes.post_desc}>{props.comic.desc}</p>
        <div className={classes.post_author}>
          <img
            src={props.comic.authorAvt}
            alt="something went wrong"
            className={classes.post_author_image}
          />
          <div className={classes.post_author_info}>
            <h4 className={classes.post_author_name}>
              {props.comic.authorName}
            </h4>
            <time className={classes.post_author_time}>
              {props.comic.uploadTime}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicItem;
