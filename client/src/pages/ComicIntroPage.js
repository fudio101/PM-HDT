import React from "react";
import ComicChapters from "../components/comic/comic-desc/ComicChapters";
import ComicTitle from "../components/comic/comic-desc/ComicTitle";

import classes from "../components/comic/comic-desc/ComicDesc.module.css";

const DUMMY_COMIC_INFO = {
  name: "Comic Name",
  image:
    "https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_thumbnails/kl-a671a463b552-1664353541793-wKI8BT5X.png?v=0&maxW=420&format=webp",
  author: "Author Name",
  likes: "1234",
  episodeNum: 90,
  categories: ["cate1", "cate2", "cate3"],
  desc:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsa sunt aperiam, enim" +
    " libero consequuntur temporibus tempore nam. Voluptas ipsa voluptates facilis ducimus enim? Nulla " +
    " necessitatibus nihil nemo quo cupiditate?",
};

function ComicIntroPage() {
  return (
    <div className={classes.container}>
      <ComicTitle info={DUMMY_COMIC_INFO} />
      <ComicChapters />
    </div>
  );
}

export default ComicIntroPage;
