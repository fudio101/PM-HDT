import React from "react";

import LoadingSpinner from "../../UI/LoadingSpinner";

import classes from "./HorizonItem.module.css";

function HorizonItem(props) {
  return (
    <>
      <div className={classes.post_feature}>
        <div className={`${classes.post_eature_media}  ${classes.post_media}`}>
          {props.postData.image_url ? (
            <img
              className={classes.post_feature_image}
              src={props.postData.image_url}
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <div className={classes.post_feature_info}>
          <div>
            {props.postData.category_names.map((item, index) => {
              return (
                <div className={classes.post_category} key={index}>
                  {item}
                </div>
              );
            })}
          </div>
          <h2>
            <div
              className={`${classes.post_feature_title} ${classes.post_title}`}
            >
              {props.postData.name}
            </div>
          </h2>
          <p className={classes.post_desc}>{props.postData.description}</p>
          <div className={classes.post_author}>
            <img
              src={props.postData.author_avt}
              className={classes.post_author_image}
            />
            <div className={classes.post_author_info}>
              <h4 className={classes.post_author_name}>
                {props.postData.author}
              </h4>
              <div className={classes.post_author_time}>
                {props.postData.published_date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HorizonItem;
