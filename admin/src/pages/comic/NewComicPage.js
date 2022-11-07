import React, { useState } from "react";
import ComicEditForm from "../../components/comic/comic-edit/ComicEditForm";

import Button from "../../components/UI/Button";

// react-select
const cateOptions = [
  { value: "Cate1", label: "Cate1" },
  { value: "Cate2", label: "Cate2" },
  { value: "Cate3", label: "Cate3" },
  { value: "Cate4", label: "Cate4" },
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

function NewComicPage() {
  const [data, setData] = useState(initVal);

  return (
    <>
      <ComicEditForm
        setData={setData}
        initVal={initVal}
        cateOptions={cateOptions}
        authorOptions={authorOptions}
      />

      <Button
        onClick={() => {
          console.log(data);
        }}
      >
        CLick...
      </Button>
    </>
  );
}

export default NewComicPage;