import React from "react";
import { Link } from "react-router-dom";

import classes from "./ComicDesc.module.css";

function ComicTitle({ info }) {
    return (
        <>
            <div className={classes.book_info}>
                <div className={classes.book_avatar}>
                    <img alt="something went wrong" src={info?.image_url} />
                </div>
                <div className={classes.book_other}>
                    <div>
                        <h1>{info?.name}</h1>
                        <ul className={classes.list_info}>
                            <li>
                                <h3 className={classes.info_title}>Tác Giả </h3>
                                <p>{info?.author?.name}</p>
                            </li>

                            <li>
                                <h3 className={classes.info_title}>Quốc Gia</h3>
                                <p>{info?.country?.name}</p>
                            </li>

                            <li>
                                <h3 className={classes.info_title}>Xuất bản</h3>
                                <p>{info?.published_date}</p>
                            </li>

                            <li>
                                <h3 className={classes.info_title}>Likes </h3>
                                <p>{info?.likes ? info?.likes : 0}</p>
                            </li>

                            <li>
                                <h3 className={classes.info_title}>
                                    Số Chương
                                </h3>
                                <p>
                                    {info?.num_of_episodes
                                        ? info?.num_of_episodes
                                        : 0}
                                </p>
                            </li>

                            <li>
                                <h3 className={classes.info_title}>Danh Mục</h3>
                                <ul className={classes.cates_list}>
                                    {info?.categories.map((cate, index) => {
                                        return (
                                            <li key={cate.id}>
                                                <Link
                                                    to={`../../category/${cate.id}`}
                                                >
                                                    {cate.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={classes.story_detail_menu}>
                <ul>
                    <li className={classes.li01}>Đọc từ đầu</li>

                    {/* <li className={classes.li02}>Theo dõi</li> */}

                    {/* <li className={classes.li03}>Thích</li> */}

                    <li className={classes.li04}>Đọc tiếp</li>
                </ul>
            </div>

            <div className={classes.desc_section}>
                <h3> Giới thiệu</h3>
                <p className={classes.desc_detail}>{info?.description}</p>
            </div>
        </>
    );
}

export default ComicTitle;
