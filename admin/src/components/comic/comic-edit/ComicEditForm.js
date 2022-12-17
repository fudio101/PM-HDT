import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import DocumentItem from "../comic-sample/DocumentItem";
import Card from "../../../components/UI/Card";
import classes from "../../../pages/asset/css/NewComicPage.module.css";

function ComicEditForm(props) {
  const [inputData, setInputData] = useState(props.initVal);
  const bottom = useRef();

  useEffect(() => {
    props.setData(inputData);
  }, [inputData, props]);

  useEffect(() => {
    // console.log(props.initVal);
    setInputData(props.initVal);
  }, [props.initVal]);

  // console.log(inputData);

  const authorInputHandler = (e) => {
    // console.log(e);
    setInputData((prev) => ({
      ...prev,
      author: {
        name: e.value,
        image_url: e.author_avt,
        id: e.id,
      },

      // author_name: e.value,
      // author_avt: e.author_avt,
      // authorID: e.id,
    }));
  };

  const formInputHandler = (e) => {
    const { value, name } = e.target;
    setInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // props.setData(inputData);
  };

  const cateInputHandler = (arr) => {
    // const cateArr = inputData.categories;
    const cateArr = [];
    const cateArrID = [];

    arr.forEach((cate) => {
      cateArrID.push(cate.id);
      cateArr.push(cate.label);
    });

    console.log(arr);

    setInputData((prev) => {
      return {
        ...prev,
        categories: [...arr],
      };
    });

    // props.setData(inputData);
  };

  const inputIMGHandler = (e) => {
    const { name } = e.target;
    const img = URL.createObjectURL(e.target.files[0]);

    setInputData((prev) => {
      return {
        ...prev,
        [name]: img,
        image: e.target.files[0],
      };
    });
    // props.setData(inputData);
  };

  const countryHandler = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        country: e.id,
      };
    });
  };

  return (
    <div
      className={
        "grid grid-cols-1 h-full w-full md:grid-cols-12 gap-2 place-items-center md:h-5/6  justify-center"
      }
    >
      <Card className={"col-span-6 md:col-span-4 relative"}>
        <DocumentItem postData={inputData} />
      </Card>
      <Card className={"col-span-6 md:col-span-8 w-11/12"}>
        <form className={"px-4"}>
          <div className={classes.comic_section}>
            <div className={classes.author_section}>
              <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
                Author
              </label>
              <div className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                <Select
                  placeholder={"Select Author..."}
                  closeMenuOnSelect={true}
                  options={props.authorOptions}
                  onChange={authorInputHandler}
                  defaultValue={props.authorOptions[0]}
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
                Name
              </label>
              <input
                placeholder="Comic Name..."
                className={
                  "block p-2.5 w-full text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                name="name"
                type={"text"}
                onChange={formInputHandler}
                onMouseDown={() => {
                  bottom.current.scrollIntoView({ behavior: "smooth" });
                }}
              ></input>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
                Thumbnail
              </label>
              <input
                name="image_url"
                type={"file"}
                onChange={inputIMGHandler}
                className={
                  "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                }
              ></input>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
                Categories
              </label>
              <div
                className={
                  "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                }
              >
                <Select
                  placeholder={"Select Categories..."}
                  closeMenuOnSelect={false}
                  // defaultValue={[props.cateOptions[0]]}
                  isMulti
                  options={props.cateOptions}
                  onChange={cateInputHandler}
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
                Country
              </label>
              <div className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                <Select
                  placeholder={"Select Country..."}
                  closeMenuOnSelect={false}
                  // defaultValue={[props.countryOptions[0]]}
                  options={props.countryOptions}
                  onChange={countryHandler}
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
                Desciption
              </label>
              <textarea
                className="block  p-2.5 w-full text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description here..."
                name="description"
                onChange={formInputHandler}
              ></textarea>
            </div>
          </div>
        </form>
        <div ref={bottom} />
      </Card>
    </div>
  );
}

export default ComicEditForm;
