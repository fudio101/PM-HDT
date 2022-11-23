import React, { useEffect, useState } from "react";
import ComicEditForm from "../../components/comic/comic-edit/ComicEditForm";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { getAllAuthor } from "../../store/actions/authorAction";
import { getAllCate } from "../../store/actions/categoryAction";
import { newComic } from "../../store/actions/comicAction";

import Button from "../../components/UI/Button";
import { ToastContainer, toast } from "react-toastify";

// const cateOptions = [
//   {
//     id: 1,
//     name: "Cate1",
//     get label() {
//       return this.name;
//     },
//     get value() {
//       return this.name;
//     },
//   },
//   {
//     id: 1,
//     name: "Cate2",

//     get label() {
//       return this.name;
//     },
//     get value() {
//       return this.name;
//     },
//   },
//   {
//     id: 1,
//     name: "Cate3",
//     get label() {
//       return this.name;
//     },
//     get value() {
//       return this.name;
//     },
//   },
// ];

// const authorOptions = [
//   {
//     id: 1,
//     name: "author1",
//     author_avt: require("../asset/img/green.webp"),
//     get value() {
//       return this.name;
//     },
//     get label() {
//       return this.name;
//     },
//   },
//   {
//     id: 2,
//     name: "author2",
//     author_avt: require("../asset/img/red.webp"),
//     get value() {
//       return this.name;
//     },
//     get label() {
//       return this.name;
//     },
//   },
//   {
//     id: 3,
//     name: "author3",
//     author_avt: require("../asset/img/yellow.webp"),
//     get value() {
//       return this.name;
//     },
//     get label() {
//       return this.name;
//     },
//   },
// ];

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

function NewComicPage() {
  const [authorColection, setAuthorCollection] = useState([]);
  const [cateColection, setCateCollection] = useState([]);

  const dispath = useDispatch();
  const { category } = useSelector((state) => state.category);
  const { author } = useSelector((state) => state.author);
  const { success } = useSelector((state) => state.comic);

  useEffect(() => {
    dispath(getAllAuthor());
    dispath(getAllCate());
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
  }, [category, author]);

  // console.log("cate", cateColection);
  // console.log("author", author);

  const [data, setData] = useState(initVal);
  const navigate = useNavigate();

  const uploadComicHandler = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("published_date", data.published_date);
    formData.append("status", 0);
    formData.append("image", data.image);
    formData.append("author_id", data.authorID);
    data.category_id.forEach((id) => {
      formData.append("category_id[]", id);
    });
    dispath(newComic({ comic: formData }));
    if (success) {
      toast("New Document Added", {
        type: "success",
      });
      setTimeout(() => {
        navigate("/doc-manage");
      }, 1500);
    }

    console.log(data);
  };

  return (
    <>
      <ComicEditForm
        setData={setData}
        initVal={initVal}
        cateOptions={cateColection}
        authorOptions={authorColection}
      />

      <Button onClick={uploadComicHandler}>CLick...</Button>
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
}

export default NewComicPage;
