import React from "react";
import classes from "./DocumentItem.module.css";
import { NavLink } from "react-router-dom";

function DocumentItem(props) {
  return (
    <div className={classes.post_item}>
      <div className={classes.post_media}>
        <img
          src={props.postData.image_url}
          alt="image not found"
          className={classes.post_image}
        />
      </div>
      <div className={classes.post_info}>
        <div>
          {props.postData.category_names.map((item, index) => {
            return (
              <div className={classes.post_category} key={index}>
                {item}
              </div>
            );
          })}
        </div>
        <NavLink>
          <div className={classes.post_feature_title}>
            {props.postData.name}
          </div>
        </NavLink>
        <div className={classes.post_desc}>{props.postData.description}</div>
        <div className={classes.post_author}>
          <img
            src={props.postData.author_avt}
            alt=""
            className={classes.post_author_image}
          />
          <div className={classes.post_author_info}>
            <h4 className={classes.post_author_name}>
              {props.postData.author_name}
            </h4>
            <time className={classes.post_author_time}>
              {props.postData.published_date}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentItem;
