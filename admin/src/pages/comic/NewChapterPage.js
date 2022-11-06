import React, { useState } from "react";

import HorizonItem from "../../components/comic/comic-sample/HorizonItem";
import DnDUpload from "../../components/comic/new-chapter/DnDUpload";
import Button from "../../components/UI/Button";

import classes from "../asset/css/NewChapter.module.css";

const initVal = {
  name: "Comic Name Here",
  thumbnail: require("../asset/img/default_2.png"),
  categories: ["cate1", "cate2", "..."],
  desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio nemo quae in delectus quod atque sunt recusandae accusantium optio. Soluta omnis quod ut quibusdam, reprehenderit ipsam in assumenda magni eaque?",
  author: "Author name",
  authorAvt: require("../asset/img/author.jpg"),
  uploadTime: "dd/MM/yyy",
};

function NewChapterPage() {
  const [returnPts, setReturnPts] = useState([]); // return (data) edit chapter values
  const [photoArr, setPhotosArr] = useState([]);

  return (
    <div>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>NEW CHAPTER</p>
      </div>
      <HorizonItem postData={initVal} />

      <DnDUpload photos={photoArr} setReturnPts={setReturnPts} />

      <Button
        onClick={() => {
          console.log(returnPts);
        }}
      >
        return
      </Button>
    </div>
  );
}

export default NewChapterPage;
