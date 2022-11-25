import React, { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment";

import Wrapper from "../../components/UI/Wrapper";

import Button from "../../components/UI/Button";
import DnDUpload from "../../components/comic/new-chapter/DnDUpload";
import ComicEditForm from "../../components/comic/comic-edit/ComicEditForm";

import classes from "../asset/css/NewComicPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getComic, newChapter } from "../../store/actions/comicAction";
import { useNavigate } from "react-router-dom";

import { getAllAuthor } from "../../store/actions/authorAction";
import { getAllCate } from "../../store/actions/categoryAction";

import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

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
  category_names: ["cate1", "cate2", "..."],
  category_id: [],
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio nemo quae in delectus quod atque sunt recusandae accusantium optio. Soluta omnis quod ut quibusdam, reprehenderit ipsam in assumenda magni eaque?",
  author_name: "Author name",
  authorID: "",
  author_avt: require("../asset/img/author.jpg"),
  published_date: moment().format("YYYY-MM-DD"),
};

function EditComicPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { category } = useSelector((state) => state.category);
  const { author } = useSelector((state) => state.author);
  const { comic, error } = useSelector((state) => state.comic);
  const [data, setData] = useState(initVal); // return (data) edit comic values
  const [returnPts, setReturnPts] = useState([]); // return (data) edit chapter values
  const [comicData, setComicData] = useState(initVal);

  const [authorColection, setAuthorCollection] = useState([]);
  const [cateColection, setCateCollection] = useState([]);

  useEffect(() => {
    dispatch(getAllAuthor());
    dispatch(getAllCate());
    dispatch(getComic(id));
  }, []);

  useEffect(() => {
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

  // console.log(comicData);
  // console.log(initVal);

  const [photoArr, setPhotosArr] = useState([]);

  const chapterInputHandler = (e) => {
    setPhotosArr(e.photos);
  };

  console.log(comicData);

  return (
    <div>
      <Wrapper>
        <h2>Edit Comic </h2>
        <Wrapper>
          <ComicEditForm
            setData={setData}
            initVal={comicData}
            authorOptions={authorColection}
            cateOptions={cateColection}
          />
        </Wrapper>

        <Button
          onClick={() => {
            console.log(data);
          }}
        >
          CLick...
        </Button>
        <div className={classes.devide_section}></div>
        <Wrapper>
          <h2>Edit Chapter </h2>
          <div>
            <Select
              placeholder={"Select The Chapter To Edit..."}
              closeMenuOnSelect={true}
              options={chapterOptions}
              onChange={chapterInputHandler}
            />
          </div>
          <div>
            <DnDUpload photos={photoArr} setReturnPts={setReturnPts} />
          </div>
        </Wrapper>
        <Button onClick={() => console.log(returnPts)}>Return</Button>
      </Wrapper>
    </div>
  );
}

export default EditComicPage;
