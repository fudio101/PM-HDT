import React, { useEffect } from "react";

import Button from "../components/UI/Button";
import TableAuthor from "../components/tables/TableAuthor";
import AuthorModal from "../components/Modal/AuthorModal";
import { useDispatch, useSelector } from "react-redux";

import { getAllAuthorInfo } from "../store/actions/authorAction";

import classes from "./asset/css/StandardMain.module.css";

function AuthorManagementPage() {
  const dispatch = useDispatch();
  const { authorInfo } = useSelector((state) => state.author);

  useEffect(() => {
    dispatch(getAllAuthorInfo());
  }, []);

  console.log(authorInfo);

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
