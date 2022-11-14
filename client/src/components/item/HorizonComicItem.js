import React from "react";

import classes from "./HorizonComicItem.module.css";

function HorizonComicItem(props) {
  return (
    <>
      <div className={classes.post_feature}>
        <div className={`${classes.post_eature_media}  ${classes.post_media}`}>
          <img
            className={classes.post_feature_image}
            alt="something went wrong"
            src={props.comic.image}
          />
        </div>
        <div className={classes.post_feature_info}>
          {props.comic.categories.map((cate, index) => {
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
              {props.comic.name}
            </div>
          </h2>
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
              <div className={classes.post_author_time}>
                {props.comic.uploadTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HorizonComicItem;
