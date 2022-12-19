import React, { useEffect, useState } from "react";
import ComicEditForm from "../../components/comic/comic-edit/ComicEditForm";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { trackPromise } from "react-promise-tracker";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthor } from "../../store/actions/authorAction";
import { getAllCate } from "../../store/actions/categoryAction";
import { newComic, getAllCountry } from "../../store/actions/comicAction";

import Button from "../../components/UI/Button";
import { ToastContainer, toast } from "react-toastify";
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
      name: "...",
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
  category_id: [],
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio nemo quae in delectus quod atque sunt recusandae accusantium optio. Soluta omnis quod ut quibusdam, reprehenderit ipsam in assumenda magni eaque?",
  author: {
    id: 1,
    name: "Author name",
    image_url: require("../asset/img/author.jpg"),
  },
  published_date: moment().format("YYYY-MM-DD"),
};

function NewComicPage() {
  const [authorColection, setAuthorCollection] = useState([]);
  const [cateColection, setCateCollection] = useState([]);
  const [countries, setCountriesCollection] = useState([]);

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const { author } = useSelector((state) => state.author);
  // const { success } = useSelector((state) => state.comic);

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
    fetchAllCountry();
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

    // setCountriesCollection(
    //   countries.map((country) => ({
    //     ...countries,
    //     label: country.name,
    //     value: country.name,
    //   }))
    // );
  }, [category, author]);

  // console.log("cate", cateColection);
  // console.log("author", author);

  const [data, setData] = useState(initVal);
  const navigate = useNavigate();

  const uploadComicHandlerAction = async () => {
    console.log(data);
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (key === "categories") {
          value.forEach((cate) => {
            formData.append("category_id[]", cate.id);
          });
        }
        if (key === "author") {
          formData.append("author_id", value.id);
        }

        if (key === "country") {
          formData.append("country_id", value);
        }
        formData.append(key, value);
      }

      formData.append("published_date", moment().format("YYYY-MM-DD"));
      // formData.append("name", data.name);
      // formData.append("published_date", data.published_date);
      // formData.append("status", 0);
      // formData.append("image", data.image);
      // formData.append("author_id", data.author.id);
      // formData.append("description", data.description);
      // formData.append("country_id", data.country);

      unwrapResult(await dispatch(newComic({ comic: formData })));

      toast("New Document Added", {
        type: "success",
      });
      setTimeout(() => {
        navigate("/comic-manage");
      }, 1500);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  const uploadComicHandler = () => {
    trackPromise(uploadComicHandlerAction());
  };

  return (
    <div>
      <ComicEditForm
        setData={setData}
        initVal={initVal}
        cateOptions={cateColection}
        authorOptions={authorColection}
        countryOptions={countries}
      />
      <div className={"flex space-x-5 justify-center w-full my-4"}>
        <Button
          className={
            "inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
          }
          onClick={uploadComicHandler}
        >
          New Comic
        </Button>
      </div>
      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  );
}

export default NewComicPage;
