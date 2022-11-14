import React from "react";

import classes from "../ComicItem.module.css";

function SlideBar(props) {
  return (
    <div className={classes.post_feature}>
      <div className={`${classes.post_feature_media} ${classes.post_media}`}>
        <img
          src={props.item.image}
          alt="something went wrong"
          className={classes.post_feature_image}
        />
      </div>
      <div className={classes.post_feature_info}>
        {props.item.categories.map((cate, index) => {
          return (
            <div className={classes.post_category} key={index}>
              {cate}
            </div>
          );
        })}
        <h2>
          <div
            className={`${classes.post_feature_title} ${classes.post_title}`}
          >
            {props.item.name}
          </div>
        </h2>
        <p className={classes.post_desc}>{props.item.desc}</p>
        <div className={classes.post_author}>
          <img
            src={props.item.authorAvt}
            alt="something went wrong"
            className={classes.post_author_image}
          />
          <div className={classes.post_author_info}>
            <h4 className={classes.post_author_name}>
              {props.item.authorName}
            </h4>
            <time className={classes.post_author_time}>
              {props.item.uploadTime}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideBar;
