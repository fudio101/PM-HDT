import React, { useState, useEffect } from "react";

import ComicTable from "../../components/tables/ComicsTable";
import { trackPromise } from "react-promise-tracker";

import classes from "../asset/css/StandardMain.module.css";
import { NavLink } from "react-router-dom";

import comicAPI from "../../api/comicAPI";
import { useDispatch, useSelector } from "react-redux";
import { getAllComic } from "../../store/actions/comicAction";

function ComicManagementPage() {
  const [comicList, setComicList] = useState([]);
  const dispatch = useDispatch();
  const { comic } = useSelector((state) => state.comic);
  // get all comics
  const fetchComicList = async () => {
    try {
      const response = await comicAPI.getAll();
      setComicList(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    trackPromise(fetchComicList());
  }, []);

  // useEffect(() => {
  //   setComicList(comic);
  // }, [comic]);

  const columns = React.useMemo(
    () => [
      {
        Header: "slug",
        accessor: "slug",
      },
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Country",
        accessor: "country.name",
      },
      {
        Header: "Author",
        accessor: "author.name",
      },

      {
        Header: "Episodes",
        accessor: "num_of_episodes",
      },
    ],
    []
  );

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>COMIC MANAGEMENT</p>
      </div>

      <div className={classes.tile}>
        <div className={`${classes.row} ${classes.element_button}`}>
          <NavLink to={"/new-comic"} className={classes.add_btn}>
            New
          </NavLink>
        </div>
        <ComicTable
          columns={columns}
          data={comicList}
          isComic={true}
        ></ComicTable>
      </div>
    </>
  );
}

export default ComicManagementPage;
