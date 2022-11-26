import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./asset/css/ChapterPage.module.css";
import { IconContext } from "react-icons";
import { TiArrowLeftThick, TiArrowRightThick, TiHome } from "react-icons/ti";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import TopUpButton from "../components/ui/TopUpButton";
import { useDispatch, useSelector } from "react-redux";
import { getChapter } from "../redux/reducers/chapterSlice";
import {
    chapterImagesSelector,
    nextChapterSelector,
    previousChapterSelector,
} from "../redux/selectors";

function ChapterPage() {
    const { comicSlug, chapter } = useParams();
    let chapterImages = useSelector(chapterImagesSelector);
    let previousChapter = useSelector(previousChapterSelector);
    let nextChapter = useSelector(nextChapterSelector);
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
                    {previousChapter ? (
                        <li className={classes.active}>
                            <Link
                                to={`/chapter/${comicSlug}/${previousChapter}`}
                            >
                                <TiArrowLeftThick
                                    style={{ marginRight: "6px" }}
                                />
                                Chap trước
                            </Link>
                        </li>
                    ) : (
                        <li className={classes.li01}>
                            <TiArrowLeftThick style={{ marginRight: "6px" }} />
                            Chap trước
                        </li>
                    )}

                    {nextChapter ? (
                        <li className={classes.active}>
                            <Link to={`/chapter/${comicSlug}/${nextChapter}`}>
                                Chap sau
                                <TiArrowRightThick
                                    style={{ marginLeft: "6px" }}
                                />
                            </Link>
                        </li>
                    ) : (
                        <li className={classes.li01}>
                            Chap sau
                            <TiArrowRightThick style={{ marginLeft: "6px" }} />
                        </li>
                    )}
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
                <Link to={"/"}>
                    <IconContext.Provider value={{ className: classes.active }}>
                        <TiHome />
                    </IconContext.Provider>
                </Link>

                {previousChapter ? (
                    <Link to={`/chapter/${comicSlug}/${previousChapter}`}>
                        <IconContext.Provider
                            value={{ className: classes.active }}
                        >
                            <BsFillArrowLeftCircleFill />
                        </IconContext.Provider>
                    </Link>
                ) : (
                    <BsFillArrowLeftCircleFill />
                )}

                {nextChapter ? (
                    <Link to={`/chapter/${comicSlug}/${nextChapter}`}>
                        <IconContext.Provider
                            value={{ className: classes.active }}
                        >
                            <BsFillArrowRightCircleFill />
                        </IconContext.Provider>
                    </Link>
                ) : (
                    <BsFillArrowRightCircleFill />
                )}
            </div>
        </div>
    );
}

export default ChapterPage;
