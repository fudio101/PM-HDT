import React from "react";
import classes from "./DocumentItem.module.css";
import { NavLink } from "react-router-dom";

function DocumentItem() {
  return (
    <div className={classes.post_item}>
      <div className={classes.post_media}>
        <img
          src="https://haycafe.vn/wp-content/uploads/2021/12/hinh-anh-naruto-dep-ngau.jpg"
          alt=""
          className={classes.post_image}
        />
      </div>
      <div className={classes.post_info}>
        <div className={classes.post_category}>Giả tưởng, siêu nhiên</div>
        <NavLink to={"/comic"}>
          <div className={classes.post_title}>Naruto_Cửu Vĩ Hồ Ly</div>
        </NavLink>
        <p className={classes.post_desc}>
          TBối cảnh Naruto xảy ra vào mười hai năm trước khi câu chuyện chính
          thức bắt đầu, một con hồ ly chín đuôi đã tấn công Konohagakure. Nó là
          một con quái vật có sức mạnh khủng khiếp, chỉ một cái vẫy từ một trong
          chín cái đuôi của nó có thể tạo ra những cơn sóng thần và san bằng
          nhiều ngọn núi. Nó gây ra sự hỗn loạn và giết chết rất nhiều người cho
          đến khi người đứng đầu làng Lá – Hokage đệ tứ – đã đánh bại nó bằng
          cách đổi lấy mạng sống của mình để phong ấn nó vào trong người một đứa
          trẻ mới sinh.
        </p>
        <div className={classes.post_author}>
          <img
            src="https://qph.cf2.quoracdn.net/main-qimg-6050518b10b77cab9dfc95c4527c61ff-lq"
            alt=""
            className={classes.post_author_image}
          />
          <div className={classes.post_author_info}>
            <h4 className={classes.post_author_name}>By Kishimoto Masashi</h4>
            <time className={classes.post_author_time}>Just now</time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentItem;
