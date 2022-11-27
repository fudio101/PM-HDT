import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./asset/css/ChapterPage.module.css";
import { IconContext } from "react-icons";
import { TiArrowLeftThick, TiArrowRightThick, TiHome } from "react-icons/ti";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getChapter } from "../redux/reducers/chapterSlice";
import {
    chapterImagesSelector,
    chapterListSelector,
    nextChapterSelector,
    previousChapterSelector,
} from "../redux/selectors";
import ReactModal from "react-modal";

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
    const defaultChapterList = useSelector(chapterListSelector);
    const [chapterList, setChapterList] = useState(defaultChapterList);
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

    return (
        <div className={classes.container} id="abcd">
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

                <button className={classes.active} onClick={openModal}>
                    Tập {chapter}
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
                contentLabel="Chọn tập"
                style={customStyles}
            >
                <div className={classes.model_content_header}>
                    <input
                        placeholder="Nhập số chương, ví dụ: 100"
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
                                Chương {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </ReactModal>
        </div>
    );
}

export default ChapterPage;
