import React from "react";

import classes from "./ComicDesc.module.css";

function ComicTitle({ info }) {
  return (
    <>
      <div className={classes.book_info}>
        <div className={classes.book_avatar}>
          <img alt="something went wrong" src={info.image} />
        </div>
        <div className={classes.book_other}>
          <div>
            <h1>{info.name}</h1>
            <ul className={classes.list_info}>
              <li>
                <h3 className={classes.info_title}>Author </h3>
                <p>{info.author}</p>
              </li>
              <li>
                <h3 className={classes.info_title}>Likes </h3>
                <p>{info.likes}</p>
              </li>
              <li>
                <h3 className={classes.info_title}>Episodes </h3>
                <p>{info.episodeNum}</p>
              </li>

              <li>
                <h3 className={classes.info_title}>Categories </h3>
                <ul className={classes.cates_list}>
                  {info.categories.map((cate, index) => {
                    return <li key={index}>{cate}</li>;
                  })}
                </ul>
              </li>
            </ul>

            <div className={classes.story_detail_menu}>
              <ul>
                <li className={classes.li01}>Đọc từ đầu</li>

                <li className={classes.li02}>Theo dõi</li>

                <li className={classes.li03}>Thích</li>

                <li className={classes.li04}>Đọc tiếp</li>
              </ul>
            </div>

            <div className={classes.desc_section}>
              <h3> Introduce</h3>
              <p className={classes.desc_detail}>{info.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComicTitle;
