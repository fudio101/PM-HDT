import React, { useEffect, useState } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { getComic } from "../../store/actions/comicAction";

import HorizonItem from "../../components/comic/comic-sample/HorizonItem";
import DnDUpload from "../../components/comic/new-chapter/DnDUpload";
import Button from "../../components/UI/Button";

import classes from "../asset/css/NewChapter.module.css";
import { useParams } from "react-router-dom";

const initVal = {
  name: "Comic Name Here",
  image_url: require("../asset/img/Loading....png"),
  category_names: ["cate1", "cate2", "..."],
  category_id: [],
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio nemo quae in delectus quod atque sunt recusandae accusantium optio. Soluta omnis quod ut quibusdam, reprehenderit ipsam in assumenda magni eaque?",
  author_name: "Author name",
  authorID: "",
  author_avt: require("../asset/img/author.jpg"),
  published_date: moment().format("YYYY-MM-DD"),
};

function NewChapterPage() {
  const dispatch = useDispatch();
  const { comic, success } = useSelector((state) => state.comic);
  const { id } = useParams();
  const [returnPts, setReturnPts] = useState([]); // return (data) edit chapter values
  const [photoArr, setPhotosArr] = useState([]);
  const [comicData, setComicData] = useState(initVal);

  useEffect(() => {
    dispatch(getComic(id));
  }, []);

  useEffect(() => {
    setComicData((prev) => ({
      ...prev,
      ...comic,
    }));
  }, [comic]);

  console.log(comicData);

  return (
    <div>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>NEW CHAPTER</p>
      </div>
      <HorizonItem postData={comicData} />

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
