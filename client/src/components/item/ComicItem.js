import React from "react";
import classes from "./ComicItem.module.css";
import { NavLink } from "react-router-dom";

function ComicItem(props) {
    return (
        <div className={classes.post_item}>
            <div className={classes.post_media}>
                {props.comic.updated_time_diff && (
                    <div className={classes.top_notice}>
                        <span className={classes.time_ago}>
                            {props.comic.updated_time_diff}
                        </span>
                    </div>
                )}
                <img
                    src={props.comic.image_url}
                    alt="something went wrong"
                    className={classes.post_image}
                />
            </div>

            <div className={classes.post_category}>
                {props.comic.categories
                    .map((cate, index) => cate.name)
                    .join(", ")}
            </div>

            <h3>
                <NavLink
                    to={`/comic/${props.comic.slug}`}
                    className={classes.post_title}
                >
                    {props.comic.name}
                </NavLink>
            </h3>

            <p className={classes.post_desc}>{props.comic.description}</p>

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
                    <time className={classes.post_author_time}>
                        {props.comic.published_date}
                    </time>
                </div>
            </div>

            {/* <div className={classes.post_info}>
                <NavLink to={`/comic/${props.comic.slug}`}>
                    <div className={classes.post_title}>{props.comic.name}</div>
                </NavLink>
                <p className={classes.post_desc}>{props.comic.description}</p>
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
                        <time className={classes.post_author_time}>
                            {props.comic.published_date}
                        </time>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default ComicItem;
