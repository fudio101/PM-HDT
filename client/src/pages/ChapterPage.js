import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./asset/css/ChapterPage.module.css";
import { TiArrowLeftThick, TiArrowRightThick, TiHome } from "react-icons/ti";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import TopUpButton from "../components/ui/TopUpButton";
import { useDispatch, useSelector } from "react-redux";
import { getChapter } from "../redux/reducers/chapterSlice";
import { chapterImagesSelector } from "../redux/selectors";

function ChapterPage() {
    const { comicSlug, chapter } = useParams();
    let chapterImages = useSelector(chapterImagesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getChapter({
                comicSlug: comicSlug,
                chapter: chapter,
            })
        );
    }, [dispatch, comicSlug, chapter]);

    return (
        <div className={classes.container}>
            <div className={classes.navbar_top}>
                <ul>
                    <li className={classes.li01}>
                        <TiArrowLeftThick style={{ marginRight: "6px" }} />
                        Chap trước
                    </li>

                    <li className={classes.li01}>
                        Chap sau
                        <TiArrowRightThick style={{ marginLeft: "6px" }} />
                    </li>
                </ul>
            </div>

            <div className={classes.comic_images_box}>
                {chapterImages?.map((image, index) => (
                    <img
                        src={image}
                        className={classes.comic_image}
                        alt="error"
                        key={index}
                    ></img>
                ))}
            </div>

            <TopUpButton />

            <div className={classes.navbar_bottom}>
                <TiHome />
                <BsFillArrowLeftCircleFill />
                <BsFillArrowRightCircleFill />
            </div>
        </div>
    );
}

export default ChapterPage;
