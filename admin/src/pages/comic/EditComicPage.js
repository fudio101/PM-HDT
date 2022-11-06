import React, { useState } from "react";
import Select from "react-select";

import Wrapper from "../../components/UI/Wrapper";

import Button from "../../components/UI/Button";
import DnDUpload from "../../components/comic/new-chapter/DnDUpload";
import ComicEditForm from "../../components/comic/comic-edit/ComicEditForm";

import classes from "../asset/css/NewComicPage.module.css";

const cateOptions = [
  { value: "Cate1", label: "Cate1" },
  { value: "Cate2", label: "Cate2" },
  { value: "Cate3", label: "Cate3" },
  { value: "Cate4", label: "Cate4" },
];

const chapterOptions = [
  {
    value: "Chapter1",
    label: "Chapter1",
    photos: [
      require("../asset/img/green.webp"),
      require("../asset/img/red.webp"),
      require("../asset/img/yellow.webp"),
      require("../asset/img/blue.webp"),
    ],
  },
  {
    value: "Chapter2",
    label: "Chapter2",
    photos: [
      "https://about.canva.com/wp-content/uploads/sites/8/2019/03/yellow.png",
      "https://about.canva.com/wp-content/uploads/sites/8/2019/03/green.png",
      "https://about.canva.com/wp-content/uploads/sites/8/2019/03/red.png",
      "https://about.canva.com/wp-content/uploads/sites/8/2019/03/blue.png",
    ],
  },

  {
    value: "Chapter3",
    label: "Chapter3",
    photos: [
      require("../asset/img/red.webp"),
      require("../asset/img/blue.webp"),
      require("../asset/img/yellow.webp"),
      require("../asset/img/green.webp"),
    ],
  },
];

const authorOptions = [
  {
    value: "Author1",
    label: "Author1",
    img: require("../asset/img/green.webp"),
  },
  {
    value: "Author2",
    label: "Author2",
    img: require("../asset/img/red.webp"),
  },
  {
    value: "Author3",
    label: "Author3",
    img: require("../asset/img/yellow.webp"),
  },
  {
    value: "Author4",
    label: "Author4",
    img: require("../asset/img/blue.webp"),
  },
];

// react-select

const initVal = {
  name: "Comic Name Here",
  thumbnail: require("../asset/img/default_2.png"),
  categories: ["cate1", "cate2", "..."],
  desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio nemo quae in delectus quod atque sunt recusandae accusantium optio. Soluta omnis quod ut quibusdam, reprehenderit ipsam in assumenda magni eaque?",
  author: "Author name",
  authorAvt: require("../asset/img/author.jpg"),
  uploadTime: "dd/MM/yyy",
};

function EditComicPage() {
  const [data, setData] = useState(initVal); // return (data) edit comic values
  const [returnPts, setReturnPts] = useState([]); // return (data) edit chapter values

  const [photoArr, setPhotosArr] = useState([]);

  const chapterInputHandler = (e) => {
    setPhotosArr(e.photos);
  };

  return (
    <div>
      <Wrapper>
        <h2>Edit Comic </h2>
        <Wrapper>
          <ComicEditForm
            setData={setData}
            initVal={initVal}
            authorOptions={authorOptions}
            cateOptions={cateOptions}
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
