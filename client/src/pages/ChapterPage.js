import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./asset/css/ChapterPage.module.css";
import { IconContext } from "react-icons";
import { TiArrowLeftThick, TiArrowRightThick, TiHome } from "react-icons/ti";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { acceptView, getChapter } from "../redux/reducers/chapterSlice";
import {
    chapterImagesSelector,
    chapterListSelector,
    isAcceptedViewSelector,
    nextChapterSelector,
    previousChapterSelector,
    userSliceInfoSelector,
    userSliceStatusSelector,
    userSliceTokenSelector,
    viewInforSelector,
} from "../redux/selectors";
import ReactModal from "react-modal";
import { addReadComic } from "../redux/reducers/readComicList";
import { useScrollPercentage } from "react-scroll-percentage";

const customStyles = {
    overlay: {
        zIndex: 150,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "390px",
    },
};

ReactModal.setAppElement("#root");

function ChapterPage() {
    const { comicSlug, chapter } = useParams();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [chapterSearchKey, setChapterSearchKey] = useState("");
    const [readAccepted, setReadAccepted] = useState(false);
    const [timeoutAccepted, setTimeoutAccepted] = useState(false);
    const defaultChapterList = useSelector(chapterListSelector);
    const [chapterList, setChapterList] = useState(defaultChapterList);
    const [ref, percentage] = useScrollPercentage();
    const userToken = useSelector(userSliceTokenSelector);
    const userInfo = useSelector(userSliceInfoSelector);
    const userSliceStatus = useSelector(userSliceStatusSelector);
    let chapterImages = useSelector(chapterImagesSelector);
    let viewInfor = useSelector(viewInforSelector);
    let previousChapter = useSelector(previousChapterSelector);
    let nextChapter = useSelector(nextChapterSelector);
    let isAcceptedView = useSelector(isAcceptedViewSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // check login
    useEffect(() => {
        if (!userToken) navigate("/login", { state: { from: location } });
    }, [navigate, location, userToken]);

    // check verify
    useEffect(() => {
        if (
            userToken &&
            userSliceStatus === "idle" &&
            userInfo &&
            !userInfo.is_verified
        )
            navigate("/verify-account", { state: { from: location } });
        console.log(userSliceStatus === "idle" && !userInfo?.is_verified);
    }, [navigate, location, userInfo, userSliceStatus, userToken]);

    useEffect(() => {
        setReadAccepted(false);
        setTimeoutAccepted(false);
    }, [comicSlug, chapter]);

    useEffect(() => {
        dispatch(
            addReadComic({
                slug: comicSlug,
                chapter: chapter,
            })
        );
    }, [dispatch, comicSlug, chapter]);

    useEffect(() => {
        if (isAcceptedView)
            dispatch(
                addReadComic({
                    slug: comicSlug,
                    chapter: nextChapter,
                })
            );
    }, [dispatch, comicSlug, isAcceptedView, nextChapter]);

    useEffect(() => {
        dispatch(
            getChapter({
                comicSlug: comicSlug,
                chapter: chapter,
            })
        );
    }, [dispatch, comicSlug, chapter]);

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    const searchChapterHandle = (event) => {
        let value = event.target.value;
        setChapterSearchKey(value);
    };

    useEffect(() => {
        let key = parseInt(chapterSearchKey);
        if (key) {
            let keys = key.toString().split("");
            let length = keys.length;

            setChapterList(
                defaultChapterList.filter((element) => {
                    for (let index = 0; index < length; index++) {
                        element = element.toString();
                        if (keys[index] !== element.charAt(index)) {
                            return false;
                        }
                    }

                    return true;
                })
            );
        } else {
            setChapterList(defaultChapterList);
        }
    }, [chapterSearchKey, defaultChapterList]);

    useEffect(() => {
        if (percentage > 0.85) {
            setReadAccepted(true);
        }
    }, [percentage]);

    useEffect(() => {
        if (viewInfor?.cooldown > 0) {
            setTimeout(
                () => setTimeoutAccepted(true),
                viewInfor?.cooldown * 1000
            );
        }
    }, [viewInfor]);

    useEffect(() => {
        if (readAccepted && timeoutAccepted) {
            dispatch(
                acceptView({
                    comicSlug: comicSlug,
                    chapter: chapter,
                    viewId: viewInfor.id,
                })
            );
        }
    }, [
        readAccepted,
        timeoutAccepted,
        dispatch,
        comicSlug,
        chapter,
        viewInfor,
    ]);

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
                                Chap tr?????c
                            </Link>
                        </li>
                    ) : (
                        <li className={classes.li01}>
                            <TiArrowLeftThick style={{ marginRight: "6px" }} />
                            Chap tr?????c
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

            <div className={classes.comic_images_box} ref={ref}>
                {chapterImages?.map((image, index) => (
                    <img
                        src={image}
                        className={classes.comic_image}
                        alt="error"
                        key={index}
                    ></img>
                ))}
            </div>

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

                <button
                    className={`${classes.active} bg-gray-200`}
                    onClick={openModal}
                >
                    Ch????ng {chapter}
                </button>

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

            <ReactModal
                isOpen={isOpenModal}
                onRequestClose={closeModal}
                contentLabel="Ch???n t???p"
                style={customStyles}
            >
                <div className={classes.model_content_header}>
                    <input
                        placeholder="Nh???p s??? ch????ng, v?? d???: 100"
                        value={chapterSearchKey}
                        onChange={searchChapterHandle}
                    ></input>
                    <div>
                        <IoClose onClick={closeModal} />
                    </div>
                </div>

                <ul className={classes.model_content_list}>
                    {chapterList?.map((item, index) => (
                        <li
                            key={index}
                            className={
                                item === parseInt(chapter)
                                    ? classes.active
                                    : undefined
                            }
                        >
                            <Link
                                to={`/chapter/${comicSlug}/${item}`}
                                onClick={closeModal}
                            >
                                Ch????ng {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </ReactModal>
        </div>
    );
}

export default ChapterPage;
