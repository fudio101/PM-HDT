import React, { useState, useEffect } from "react";

import ComicTable from "../../components/tables/ComicsTable";

import classes from "../asset/css/StandardMain.module.css";
import { NavLink } from "react-router-dom";

import comicAPI from "../../api/comicAPI";

function ComicManagementPage() {
  const [comicList, setComicList] = useState([]);
  // get all comics
  const fetchComicList = async () => {
    try {
      const response = await comicAPI.getAll();
      setComicList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComicList();
  }, []);

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
        Header: "Like",
        accessor: "likes",
      },
      {
        Header: "Author",
        accessor: "author.name",
      },
      {
        Header: "UserName",
        accessor: "user_name",
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

      <div className={classes.col_md_12}>
        <div className={classes.tile}>
          <div className={classes.tile_body}>
            <div className={`${classes.row} ${classes.element_button}`}>
              <div className={classes.col_sm_2}>
                <NavLink to={"/new-comic"} className={classes.add_btn}>
                  New
                </NavLink>
              </div>
            </div>
            <ComicTable
              columns={columns}
              data={comicList}
              isComic={true}
            ></ComicTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComicManagementPage;
