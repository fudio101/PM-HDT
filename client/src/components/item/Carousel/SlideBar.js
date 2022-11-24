import React from "react";

import classes from "../ComicItem.module.css";

function SlideBar(props) {
    return (
        <div className={classes.post_feature}>
            <div
                className={`${classes.post_feature_media} ${classes.post_media}`}
            >
                <img
                    src={props.item.image_url}
                    alt="something went wrong"
                    className={classes.post_feature_image}
                />
            </div>
            <div className={classes.post_feature_info}>
                {props.item.categories.map((cate, index) => {
                    return (
                        <div className={classes.post_category} key={cate.id}>
                            {cate.name}
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
                <p className={classes.post_desc}>{props.item.description}</p>
                <div className={classes.post_author}>
                    <img
                        src={props.item.author.image_url}
                        alt="something went wrong"
                        className={classes.post_author_image}
                    />
                    <div className={classes.post_author_info}>
                        <h4 className={classes.post_author_name}>
                            {props.item.author.name}
                        </h4>
                        <time className={classes.post_author_time}>
                            {props.item.published_date}
                        </time>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlideBar;
