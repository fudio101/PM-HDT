import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import ComicItem from "../components/item/ComicItem";
import SlideBar from "../components/item/Carousel/SlideBar";
import NextArrow from "../components/item/Carousel/NextArrow";
import PrevArrow from "../components/item/Carousel/PrevArrow";

import classes from "./asset/css/HomePage.module.css";
import { getLatestComics } from "../redux/reducers/latestComicsSlice";
import { latestComicsSelector } from "../redux/selectors";

// slider setting
const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

function HomePage() {
    const dispatch = useDispatch();
    const latestComics = useSelector(latestComicsSelector);

    useEffect(() => {
        dispatch(getLatestComics());
    }, [dispatch]);

    return (
        <>
            {/* slider */}
            <div className={`${classes.container} `}>
                <div className={classes.slider}>
                    <Slider {...setting}>
                        {latestComics.map((item) => {
                            return <SlideBar item={item} key={item.slug} />;
                        })}
                    </Slider>
                </div>
                {/* comic items */}
                <div className={classes.post_list}>
                    {latestComics.map((comic) => {
                        return <ComicItem comic={comic} key={comic.slug} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default HomePage;
