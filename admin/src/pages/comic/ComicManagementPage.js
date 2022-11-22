import React, { useState, useEffect } from "react";

import Table from "../../components/tables/Table";

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
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Like",
        accessor: "likes",
      },
      {
        Header: "Author",
        accessor: "author_name",
      },
      {
        Header: "Status",
        accessor: "status",
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
                  Add
                </NavLink>
              </div>
            </div>
            <Table columns={columns} data={comicList} isComic={true}></Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComicManagementPage;
