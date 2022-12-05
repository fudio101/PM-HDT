import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./HorizonComicItem.module.css";

function HorizonComicItem(props) {
    return (
        <>
            <div className={classes.post_feature}>
                <div
                    className={`${classes.post_eature_media}  ${classes.post_media}`}
                >
                    <img
                        className={classes.post_feature_image}
                        alt="something went wrong"
                        src={props.comic.image_url}
                    />
                </div>
                <div className={classes.post_feature_info}>
                    <div className={classes.post_category}>
                        {props.comic.categories
                            .map((cate, index) => cate.name)
                            .join(", ")}
                    </div>
                    <h2>
                        <NavLink
                            to={`/comic/${props.comic.slug}`}
                            className={`${classes.post_feature_title} ${classes.post_title}`}
                        >
                            {props.comic.name}
                        </NavLink>
                    </h2>
                    <p className={classes.post_desc}>
                        {props.comic.description}
                    </p>
                    <div className={classes.post_author}>
                        <img
                            src={props.comic.author.image_url}
                            alt="something went wrong"
                            className={classes.post_author_image}
                        />
                        <div className={classes.post_author_info}>
                            <h4 className={classes.post_author_name}>
                                {props.comic.author.name}
                            </h4>
                            <div className={classes.post_author_time}>
                                {props.comic.published_date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HorizonComicItem;
