import React, { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment";
import { trackPromise } from "react-promise-tracker";

import Button from "../../components/UI/Button";
import DnDUpload from "../../components/comic/new-chapter/DnDUpload";
import ComicEditForm from "../../components/comic/comic-edit/ComicEditForm";

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
import { NavLink, useNavigate } from "react-router-dom";

import { getAllAuthor } from "../../store/actions/authorAction";
import { getAllCate } from "../../store/actions/categoryAction";

import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import Card from "../../components/UI/Card";

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
  // const { episodes } = useSelector((state) => state.episode);

  const [data, setData] = useState(initVal); // return (data) edit comic values
  const [returnPts, setReturnPts] = useState([]); // return (data) edit chapter values
  const [comicData, setComicData] = useState(initVal);
  const [comicEpisodeList, setComicEpisodeList] = useState(initVal.episodes); // comic ep list

  const [authorColection, setAuthorCollection] = useState([]);
  const [cateColection, setCateCollection] = useState([]);
  const [countries, setCountriesCollection] = useState([]);
  const [isUpdateComic, setIsUpdateComic] = useState(true);

  const [photoArr, setPhotosArr] = useState([]);
  const [selectedEp, setSelectedEp] = useState();

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
    trackPromise(fetchAllCountry());
  }, []);

  useEffect(() => {
    // get all category, author,comic (list)
    setCateCollection(
      category.map((cate) => ({
        ...cate,
        label: cate.name,
        value: cate.name,
      }))
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

  const deleteEpisodeHandlerAction = async () => {
    try {
      unwrapResult(await dispatch(deleteComicEP(selectedEp)));
      toast("Episode Deleted Successfully", {
        type: "success",
      });
      navigate("/comic-manage");
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };
  const deleteEpisodeHandler = () => {
    trackPromise(deleteEpisodeHandlerAction());
  };

  //update comic episode
  const updateComicEpHandlerAction = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      returnPts.forEach((photo) => {
        formData.append("images[]", photo[1]);
        formData.append("imageOrder[]", photo[1].name);
      });

      unwrapResult(
        await dispatch(updateComicEP({ id: selectedEp, photos: formData }))
      );

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

  const updateComicEpHandler = () => {
    trackPromise(updateComicEpHandlerAction());
  };
  //update comic
  const updateComicHandlerAction = async () => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("status", 0);
      formData.append("image", data.image);
      formData.append("author_id", data.author.id);
      formData.append("description", data.description);
      formData.append("country_id", data.country.id);
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

      unwrapResult(await dispatch(update({ id: id, comic: formData })));

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
  const deleteComicHandlerAction = async () => {
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

  const updateComicHandler = () => {
    trackPromise(updateComicHandlerAction());
  };

  const deleteComicHandler = () => {
    trackPromise(deleteComicHandlerAction());
  };

  return (
    <div className="p-2">
      <ul className="flex border-b space-x-4">
        <li className="-mb-px mr-1">
          <NavLink
            onClick={() => {
              setIsUpdateComic(true);
            }}
            className={`bg-white inline-block  text-blue-700 font-semibold py-2 px-4 ${
              isUpdateComic
                ? "border-l border-t border-r rounded-t border-b-0 "
                : ""
            } `}
          >
            Edit Comic
          </NavLink>
        </li>
        <li className="mr-1">
          <NavLink
            onClick={() => {
              setIsUpdateComic(false);
            }}
            className={`bg-white inline-block  text-blue-700 font-semibold py-2 px-4   ${
              !isUpdateComic
                ? "border-l border-t border-r rounded-t border-b-0 "
                : ""
            }  `}
          >
            Edit Chapter
          </NavLink>
        </li>
      </ul>
      <div>
        {isUpdateComic ? (
          <div>
            <ComicEditForm
              setData={setData}
              initVal={comicData}
              authorOptions={authorColection}
              cateOptions={cateColection}
              countryOptions={countries}
            />
            <div className={"flex space-x-5 justify-center w-full mt-8 mb-4"}>
              <Button
                className={
                  "inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-yellow-500 rounded-full shadow ripple hover:shadow-lg hover:bg-yellow-600 focus:outline-none"
                }
                onClick={updateComicHandler}
              >
                Update Comic
              </Button>
              <Button
                className={
                  "inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
                }
                onClick={deleteComicHandler}
              >
                Delete Comic
              </Button>
            </div>
          </div>
        ) : (
          <Card>
            <div>
              <Select
                placeholder={"Select The Episode To Edit..."}
                closeMenuOnSelect={true}
                options={comicEpisodeList}
                onChange={chapterInputHandler}
              />
            </div>

            <div>
              <div>
                <DnDUpload photos={photoArr} setReturnPts={setReturnPts} />
              </div>
              <div className={"flex space-x-5 justify-center  w-full py-2"}>
                <button
                  className={
                    "inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-yellow-500 rounded-full shadow ripple hover:shadow-lg hover:bg-yellow-600 focus:outline-none"
                  }
                  onClick={updateComicEpHandler}
                >
                  Update Chapter
                </button>
                <button
                  className={
                    "inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
                  }
                  onClick={deleteEpisodeHandler}
                >
                  Delete Chapter
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  );
}

export default EditComicPage;
