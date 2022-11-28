import React, { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment";

import Wrapper from "../../components/UI/Wrapper";

import Button from "../../components/UI/Button";
import DnDUpload from "../../components/comic/new-chapter/DnDUpload";
import ComicEditForm from "../../components/comic/comic-edit/ComicEditForm";

import classes from "../asset/css/NewComicPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  getComic,
  update,
  delComic,
  getAllCountry,
} from "../../store/actions/comicAction";
import {
  getComicEpByID,
  deleteComicEP,
  updateComicEP,
} from "../../store/actions/comicEpAction";
import { useNavigate } from "react-router-dom";

import { getAllAuthor } from "../../store/actions/authorAction";
import { getAllCate } from "../../store/actions/categoryAction";

import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

const chapterOptions = [
  {
    value: "Chapter1",
    label: "Chapter1",
  },
  {
    value: "Chapter2",
    label: "Chapter2",
  },

  {
    value: "Chapter3",
    label: "Chapter3",
  },
];

// react-select
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

  countries: [
    {
      id: 1,
      name: "Category 1",
    },
    {
      id: 2,
      name: "...",
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

function EditComicPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { category } = useSelector((state) => state.category);
  const { author } = useSelector((state) => state.author);
  const { comic } = useSelector((state) => state.comic);
  const { episodes } = useSelector((state) => state.episode);

  const [data, setData] = useState(initVal); // return (data) edit comic values
  const [returnPts, setReturnPts] = useState([]); // return (data) edit chapter values
  const [comicData, setComicData] = useState(initVal);
  const [comicEpisodeList, setComicEpisodeList] = useState(initVal.episodes); // comic ep list

  const [authorColection, setAuthorCollection] = useState([]);
  const [cateColection, setCateCollection] = useState([]);
  const [countries, setCountriesCollection] = useState([]);

  const fetchAllCountry = async () => {
    const result = unwrapResult(await dispatch(getAllCountry()));
    setCountriesCollection(
      result.map((country) => ({
        ...country,
        label: country.name,
        value: country.name,
      }))
    );
  };

  useEffect(() => {
    dispatch(getAllAuthor());
    dispatch(getAllCate());
    dispatch(getComic(id));
    fetchAllCountry();
  }, []);

  useEffect(() => {
    // get all category, author,comic (list)
    setCateCollection(
      category.map((cate) => ({ ...cate, label: cate.name, value: cate.name }))
    );

    setAuthorCollection(
      author.map((authors) => ({
        ...authors,
        label: authors.name,
        value: authors.name,
        author_avt: authors.image_url,
      }))
    );

    setComicData((prev) => ({
      ...prev,
      ...comic,
    }));
  }, [category, author, comic]);

  useEffect(() => {
    const list = comicData.episodes.map((ep) => {
      return {
        ...ep,
        value: ep.episode_number,
        label: "Episode " + ep.episode_number,
      };
    });
    setComicEpisodeList(list);
  }, [comic, comicData]);

  const [photoArr, setPhotosArr] = useState([]);
  const [selectedEp, setSelectedEp] = useState();

  const chapterInputHandler = async (e) => {
    setSelectedEp(e.id);
    const result = unwrapResult(await dispatch(getComicEpByID(e.id)));
    const itemDnD = [];
    result.image_urls.forEach((item) => {
      itemDnD.push([item]);
    });
    setPhotosArr(itemDnD);
    // console.log(itemDnD);
  };

  //delete episode

  const deleteEpisodeHandler = async () => {
    try {
      const action = await dispatch(deleteComicEP(selectedEp));
      unwrapResult(action);
      toast("Episode Deleted Successfully", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  //update comic episode

  const updateComicEpHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      returnPts.forEach((photo) => {
        formData.append("images[]", photo[1]);
        formData.append("imageOrder[]", photo[1].name);
      });
      const action = await dispatch(
        updateComicEP({ id: selectedEp, photos: formData })
      );
      const unwrap = unwrapResult(action);
      toast("Episode Update Successfully", {
        type: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      window.location.reload();
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  //update comic
  const updateComicHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("status", 0);
      formData.append("image", data.image);
      formData.append("author_id", data.author.id);
      formData.append("description", data.description);
      formData.append("country_id", data.country);
      data.categories.forEach((cate) => {
        formData.append("category_id[]", cate.id);
      });

      // remove false key in formData
      for (const pair of formData.entries()) {
        if (!pair[1] || pair[1] === "undefined") {
          console.log(pair[0]);
          formData.delete(pair[0]);
          console.log("deleted");
        }
      }
      const action = await dispatch(update({ id: id, comic: formData }));
      unwrapResult(action);
      toast("Comic Update Successfully", {
        type: "success",
      });
      setTimeout(() => {
        navigate("/comic-manage");
      }, 1000);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  //delete Comic
  const deleteComicHandler = async () => {
    try {
      const action = await dispatch(delComic(id));
      unwrapResult(action);
      toast("Comic Deleted Successfully", {
        type: "success",
      });

      setTimeout(() => {
        navigate("/comic-manage");
      }, 2000);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  return (
    <div>
      <Wrapper>
        <h2>Edit Comic</h2>
        <Wrapper>
          <ComicEditForm
            setData={setData}
            initVal={comicData}
            authorOptions={authorColection}
            cateOptions={cateColection}
            countryOptions={countries}
          />
          <Button onClick={updateComicHandler}>Update</Button>
          <Button onClick={deleteComicHandler}>Delete</Button>
        </Wrapper>

        <div className={classes.devide_section}></div>
        <Wrapper>
          <h2>Edit Chapter </h2>
          <div>
            <Select
              placeholder={"Select The Episode To Edit..."}
              closeMenuOnSelect={true}
              options={comicEpisodeList}
              onChange={chapterInputHandler}
            />
          </div>
          <div>
            <DnDUpload photos={photoArr} setReturnPts={setReturnPts} />
          </div>
          <Button onClick={updateComicEpHandler}>Update</Button>
          <Button onClick={deleteEpisodeHandler}>Delete</Button>
        </Wrapper>
      </Wrapper>
      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  );
}

export default EditComicPage;
