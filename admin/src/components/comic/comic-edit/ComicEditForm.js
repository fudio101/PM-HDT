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

  const authorInputHandler = (e) => {
    // console.log(e);
    setInputData((prev) => {
      return {
        ...prev,
        author_name: e.value,
        author_avt: e.author_avt,
        authorID: e.id,
      };
    });
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

    setInputData((prev) => {
      return {
        ...prev,
        category_id: cateArrID,
        category_names: cateArr,
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

  return (
    <Wrapper>
      <div className={classes.new_comic}>
        <div className={classes.preview_section}>
          <div>Preview</div>
          <DocumentItem postData={inputData} />
        </div>
        <div className={classes.input_section}>
          <form className={classes.comic_form_info}>
            <div className={classes.author_section}>
              <h1>Author</h1>
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
            <div className={classes.comic_section}>
              <h1>Comic</h1>
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
    </Wrapper>
  );
}

export default ComicEditForm;
