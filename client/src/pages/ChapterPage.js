import React from "react";
import { useParams } from "react-router-dom";
import classes from "./asset/css/ChapterPage.module.css";
import { TiArrowLeftThick, TiArrowRightThick, TiHome } from "react-icons/ti";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import TopUpButton from "../components/ui/TopUpButton";

const EPISODE_IMAGE_COLLECTION = [
    "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
    "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
    "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
    "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
    "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
    "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
    "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
    "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
];

function ChapterPage() {
    const { comicSlug, chapter } = useParams();
    console.log(comicSlug);
    console.log(chapter);

    return (
        <div className={classes.container}>
            <div className={classes.navbar_top}>
                <ul>
                    <li className={classes.li01}>
                        <TiArrowLeftThick style={{ "margin-right": "6px" }} />
                        Chap trước
                    </li>

                    <li className={classes.li01}>
                        Chap sau
                        <TiArrowRightThick style={{ "margin-left": "6px" }} />
                    </li>
                </ul>
            </div>

            {EPISODE_IMAGE_COLLECTION.map((image, index) => (
                <div className={classes.comic_image} key={index}>
                    <img src={image} alt="error"></img>
                </div>
            ))}

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
