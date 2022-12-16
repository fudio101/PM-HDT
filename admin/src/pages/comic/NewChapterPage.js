import React, { useEffect, useState } from "react";
import moment from "moment";

import { trackPromise } from "react-promise-tracker";
import { useDispatch, useSelector } from "react-redux";
import { getComic } from "../../store/actions/comicAction";
import { newChapter } from "../../store/actions/comicEpAction";
// import { useNavigate } from "react-router-dom";

import HorizonItem from "../../components/comic/comic-sample/HorizonItem";
import DnDUpload from "../../components/comic/new-chapter/DnDUpload";
import Button from "../../components/UI/Button";

import classes from "../asset/css/NewChapter.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

const initVal = {
  name: "Comic Name Here",
  image_url: require("../asset/img/default_2.png"),
  categories: [
    {
      id: 1,
      name: "Category 1",
    },
    {
      id: 2,
      name: "Category 2",
    },
  ],
  // category_id: [],
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio nemo quae in delectus quod atque sunt recusandae accusantium optio. Soluta omnis quod ut quibusdam, reprehenderit ipsam in assumenda magni eaque?",
  author: {
    id: 1,
    name: "Author name",
    image_url: require("../asset/img/Loading.png"),
  },
  episodes: [
    {
      comic_id: 1,
      episode_number: 1,
      published_date: "24/11/2022",
    },
    {
      comic_id: 1,
      episode_number: 2,
      published_date: "24/11/2022",
    },
  ],
  published_date: moment().format("YYYY-MM-DD"),
};

function NewChapterPage() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { comic, error } = useSelector((state) => state.comic);
  const { id } = useParams();
  const [returnPts, setReturnPts] = useState([]); // return (data) edit chapter values
  const [photoArr, setPhotosArr] = useState([]);
  const [comicData, setComicData] = useState(initVal);
  const [episode, setEpisode] = useState();
  const [defaultEpNum, setDefaultEpNum] = useState();

  useEffect(() => {
    dispatch(getComic(id));
  }, []);

  useEffect(() => {
    setComicData((prev) => ({
      ...prev,
      ...comic,
    }));
    const maxEpNum = Math.max(
      ...comicData.episodes.map((x) => x.episode_number)
    );
    setDefaultEpNum(maxEpNum + 1);
    setEpisode(maxEpNum + 1);
  }, [comic]);

  useEffect(() => {
    toast(error, {
      type: "error",
    });
  }, [error]);

  const uploadEPHandlerAction = async () => {
    try {
      const formData = new FormData();
      returnPts.forEach((photo) => {
        formData.append("images[]", photo[1]);
        formData.append("imageOrder[]", photo[1].name);
      });

      formData.append("comic_id", id);
      formData.append("episode_number", episode);
      unwrapResult(await dispatch(newChapter({ photos: formData })));
      toast("New Episode Added Successfully", {
        type: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  const uploadEPHandler = (e) => {
    e.preventDefault();
    trackPromise(uploadEPHandlerAction());
  };

  return (
    <div>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>NEW CHAPTER</p>
      </div>
      <HorizonItem postData={comicData} />
      <div className={classes.action__wrapper}>
        <div className={classes.chapter_select}>
          <label>Episode:</label>
          <input
            type="number"
            id="points"
            name="points"
            min={1}
            defaultValue={defaultEpNum}
            onChange={(e) => {
              setEpisode(e.target.value);
            }}
          />
          <Button className={classes.btn__done} onClick={uploadEPHandler}>
            Done
          </Button>
        </div>
        <div className={classes.btn__wrapper__done}></div>
        <DnDUpload photos={photoArr} setReturnPts={setReturnPts} />
      </div>

      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  );
}

export default NewChapterPage;
