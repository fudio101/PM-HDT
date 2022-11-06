import React, { useEffect, useState } from "react";

import Button from "../components/UI/Button";
import TableAuthor from "../components/tables/TableAuthor";
import AuthorModal from "../components/Modal/AuthorModal";

import authorAPI from "../api/authorAPI";

import classes from "./asset/css/StandardMain.module.css";

function AuthorManagementPage() {
  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    const fetchAuthorList = async () => {
      try {
        const response = await authorAPI.getAll();
        setAuthorList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthorList();
  }, []);

  useEffect(() => {
    const fetchAuthor = async (id) => {
      try {
        const response = await authorAPI.get(id);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthor(1);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Author Name",
        accessor: "authorName",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        id: 1,
        authorName: "firstname1",
        avt: "https://res.cloudinary.com/dy9g317c9/image/upload/v1667578576/document_web/img/avatar/red_dcumba.webp",
      },
      {
        id: 2,
        authorName: "firstname2",
        avt: "https://res.cloudinary.com/dy9g317c9/image/upload/v1667578576/document_web/img/avatar/red_dcumba.webp",
      },
    ],
    []
  );

  const [isNew, setNew] = React.useState(false);
  const [rowSelected, setRowSelected] = React.useState("");

  const closeHandler = () => {
    setRowSelected("");
    alert("firstname`s row selected " + rowSelected);
    setNew(false);
  };

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>AUTHOR MANAGEMENT</p>
      </div>

      <div className={classes.col_md_12}>
        <div className={classes.tile}>
          <div className={classes.tile_body}>
            <div className={`${classes.row} ${classes.element_button}`}>
              <div className={classes.col_sm_2}>
                <Button
                  className={classes.add_btn}
                  onClick={() => {
                    setRowSelected("new");
                    setNew(true);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
            <TableAuthor
              columns={columns}
              data={data}
              setRowSelected={setRowSelected}
            ></TableAuthor>
          </div>
        </div>
      </div>
      {rowSelected && <AuthorModal onClose={closeHandler} isNew={isNew} />}
    </>
  );
}

export default AuthorManagementPage;
