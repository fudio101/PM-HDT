import React from "react";
import { useSelector } from "react-redux";
import ComicRankingsFilter from "../components/item/Filters/ComicRankingsFilter";

import HorizonComicItem from "../components/item/HorizonComicItem";

import classes from "../components/item/HorizonComicItem.module.css";
import { comicRankingsFilterResultSelector } from "../redux/selectors";

function RankPage() {
    let comicsFilter = useSelector(comicRankingsFilterResultSelector);

    return (
        <div className={`${classes.container} flex-col`}>
            {/* <div className={classes.tag_name}>
        <h1 className={classes.tag_title}>Popular</h1>
      </div> */}
            <ComicRankingsFilter />

            {comicsFilter.map((comic) => {
                return <HorizonComicItem comic={comic} key={comic.slug} />;
            })}
        </div>
    );
}

export default RankPage;
