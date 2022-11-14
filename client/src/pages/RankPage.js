import React from "react";

import HorizonComicItem from "../components/item/HorizonComicItem";

import classes from "../components/item/HorizonComicItem.module.css";

const COMIC_ITEM_DATA = [
  {
    id: 1,
    name: "Comic Name",
    image:
      "https://haycafe.vn/wp-content/uploads/2021/12/hinh-anh-naruto-dep-ngau.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quisquam voluptates eum non sed, necessitatibus repudiandae ratione possimus, quas eius autem vitae recusandae nobis nulla provident maiores numquam adipisci veritatis!",
    categories: ["cate1", "cate2", "cate3"],
    authorAvt:
      "https://qph.cf2.quoracdn.net/main-qimg-6050518b10b77cab9dfc95c4527c61ff-lq",
    authorName: "By Kishimoto Masashi",
    uploadTime: "JustNow",
  },
  {
    id: 2,
    name: "Comic Name",
    image:
      "https://haycafe.vn/wp-content/uploads/2021/12/hinh-anh-naruto-dep-ngau.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quisquam voluptates eum non sed, necessitatibus repudiandae ratione possimus, quas eius autem vitae recusandae nobis nulla provident maiores numquam adipisci veritatis!",
    categories: ["cate1", "cate2", "cate3"],
    authorAvt:
      "https://qph.cf2.quoracdn.net/main-qimg-6050518b10b77cab9dfc95c4527c61ff-lq",
    authorName: "By Kishimoto Masashi",
    uploadTime: "JustNow",
  },
  {
    id: 3,
    name: "Comic Name",
    image:
      "https://haycafe.vn/wp-content/uploads/2021/12/hinh-anh-naruto-dep-ngau.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quisquam voluptates eum non sed, necessitatibus repudiandae ratione possimus, quas eius autem vitae recusandae nobis nulla provident maiores numquam adipisci veritatis!",
    categories: ["cate1", "cate2", "cate3"],
    authorAvt:
      "https://qph.cf2.quoracdn.net/main-qimg-6050518b10b77cab9dfc95c4527c61ff-lq",
    authorName: "By Kishimoto Masashi",
    uploadTime: "JustNow",
  },
];

function RankPage() {
  return (
    <div className={classes.container}>
      <div className={classes.tag_name}>
        <h1 className={classes.tag_title}>Popular</h1>
      </div>

      {COMIC_ITEM_DATA.map((comic) => {
        return <HorizonComicItem comic={comic} key={comic.id} />;
      })}
    </div>
  );
}

export default RankPage;
