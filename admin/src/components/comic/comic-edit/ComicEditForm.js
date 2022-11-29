import React, { useEffect, useState } from "react";
import Select from "react-select";

import Wrapper from "../../UI/Wrapper";
import DocumentItem from "../comic-sample/DocumentItem";

import classes from "../../../pages/asset/css/NewComicPage.module.css";

function ComicEditForm(props) {
  const [inputData, setInputData] = useState(props.initVal);

  useEffect(() => {
    props.setData(inputData);
  }, [inputData]);

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
    const { value, name } = e.target;
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
    <div>
      <div className={classes.new_comic}>
        <div className={classes.preview_section}>
          <DocumentItem postData={inputData} />
        </div>
        <div className={classes.input_section}>
          <form className={classes.comic_form_info}>
            <div className={classes.comic_section}>
              <div className={classes.author_section}>
                <label>Author</label>
                <div>
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
                <label>Name</label>
                <input
                  placeholder="Comic Name..."
                  className={classes.author_name_input}
                  name="name"
                  type={"text"}
                  onChange={formInputHandler}
                ></input>
              </div>
              <div>
                <label>Thumbnail</label>
                <input
                  name="image_url"
                  type={"file"}
                  onChange={inputIMGHandler}
                  className={classes.upload__thumbnail}
                ></input>
              </div>
              <div>
                <label>Categories</label>
                <div className={classes.cate_choose}>
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
                <label>Country</label>
                <div className={classes.cate_choose}>
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
                <label>Desciption</label>
                <textarea
                  name="description"
                  placeholder="Desciption Here"
                  onChange={formInputHandler}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComicEditForm;
