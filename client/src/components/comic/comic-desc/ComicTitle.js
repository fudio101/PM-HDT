import React from "react";

import classes from "./ComicDesc.module.css";

function ComicTitle() {
  return (
    <>
      <div className={classes.book_info}>
        <div className={classes.book_avatar}>
          <img src="https://i.truyenvua.xyz/ebook/190x247/rong-anh-hung-va-nguoi-dua-thu_1591494538.jpg?gf=hdfgdfg&mobile=2" />
        </div>
        <div className={classes.book_other}>
          <h1>Cửu vĩ hồ ly</h1>
          <div>
            <ul className={classes.list_info}>
              <li>
                <p className={classes.info_title}>Tác giả</p>
                <p>Đang Cập Nhật</p>
              </li>
              <li>
                <p className={classes.info_title}>Tình trạng</p>
                <p>Đang Cập Nhật</p>
              </li>
              <li>
                <p className={classes.info_title}>Lượt thích</p>
                <p>176</p>
              </li>

              <li>
                <p className={classes.info_title}>Lượt theo dõi</p>
                <p>605</p>
              </li>

              <li>
                <p className={classes.info_title}>Lượt xem</p>
                <p>54,501</p>
              </li>
            </ul>

            <ul className={classes.cates_list}>
              <li>Comedy</li>
              <li>Manhua</li>
              <li>Ngôn Tình</li>
              <li>Truyện Màu</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={classes.story_detail_menu}>
        <ul>
          <li className={classes.li01}>Đọc từ đầu</li>

          <li className={classes.li02}>Theo dõi</li>

          <li className={classes.li03}>Thích</li>

          <li className={classes.li04}>Đọc tiếp</li>
        </ul>
      </div>

      <div className={classes.desc_section}>
        <h3> Giới thiệu</h3>
        <p>
          Naruto là một cậu bé có mơ ước trở thành hokage của làng Konoha,được
          Hokage phong ấn trong người một trong 9 quái vật của thể giới : Cửu vĩ
          Hồ ly.Vì cho cậu là một con quái vật, ko ai dám chơi với cậu!& Vì muốn
          được thừa nhận nên rất phá phách.Khi tốt nghiệp trướng ninja, lần đầu
          tiên cậ u đã được thừa nhận và có một người bạn thân là Sasuke...
        </p>
      </div>
    </>
  );
}

export default ComicTitle;
