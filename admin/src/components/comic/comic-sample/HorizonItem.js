import React from "react";

import classes from "./HorizonItem.module.css";

function HorizonItem(props) {
  return (
    <>
      <div className={classes.post_feature}>
        <div className={`${classes.post_eature_media}  ${classes.post_media}`}>
          <img
            alt="something went wrong"
            className={classes.post_feature_image}
            src={props.postData?.image_url}
          />
        </div>
        <div className={classes.post_feature_info}>
          <div>
            {props.postData?.categories.map((item) => {
              return (
                <div className={classes.post_category} key={item.id}>
                  {item.name}
                </div>
              );
            })}
          </div>
          <h2>
            <div
              className={`${classes.post_feature_title} ${classes.post_title}`}
            >
              {props.postData?.name}
            </div>
          </h2>
          <p className={classes.post_desc}>
            {props.postData?.description ? props.postData?.description : ""}
          </p>
          <div className={classes.post_author}>
            <img
              alt="something went wrong"
              src={props.postData?.author.image_url}
              className={classes.post_author_image}
            />
            <div className={classes.post_author_info}>
              <h4 className={classes.post_author_name}>
                {props.postData?.author.name}
              </h4>
              <div className={classes.post_author_time}>
                {props.postData?.published_date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HorizonItem;
