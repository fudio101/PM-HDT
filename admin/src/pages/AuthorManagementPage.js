import React, { useEffect, useState } from "react";

import Button from "../components/UI/Button";
import TableAuthor from "../components/tables/TableAuthor";
import AuthorModal from "../components/Modal/AuthorModal";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllAuthor,
  newAuthor,
  delAuthor,
} from "../store/actions/authorAction";

import authorAPI from "../api/authorAPI";

import classes from "./asset/css/StandardMain.module.css";

function AuthorManagementPage() {
  const { error, author, success } = useSelector((state) => state.author);

  const [authorData, setAuthorData] = useState();
  // const [authorList, setAuthorList] = useState([]);

  const [isNew, setNew] = React.useState(false);
  const [rowSelected, setRowSelected] = React.useState("");

  const dispath = useDispatch();

  // get all authors
  const fetchAuthorList = () => {
    setTimeout(() => {
      dispath(getAllAuthor());
    }, 200);
  };

  useEffect(() => {
    fetchAuthorList();
  }, []);

  useEffect(() => {
    toast(error, {
      type: "error",
    });
  }, [error]);

  // add new author
  const newAuthorHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", authorData.name);
      formData.append("image", authorData.img);
      dispath(newAuthor({ author: formData }));
      if (success === true) {
        toast("New Author Added", {
          type: "success",
        });
      }
    } catch (error) {}

    fetchAuthorList();

    closeHandler();
  };

  // Delete An author

  const deleteHandler = async (e) => {
    e.preventDefault();
    dispath(delAuthor(rowSelected.id));
    if (success === true) {
      toast("Author Has Been Deleted", {
        type: "success",
      });
    }
    // try {
    //   await authorAPI.delete(rowSelected.id);
    //   toast("Author Has Been Deleted", {
    //     type: "success",
    //   });
    // } catch (error) {
    //   toast(error.response.data.message, {
    //     type: "error",
    //   });
    // }

    fetchAuthorList();
    closeHandler();
  };

  //update an author

  const updateAuthor = async (id, author) => {
    try {
      await authorAPI.update(id, author);
      toast("Author Updated", {
        type: "success",
      });
    } catch (error) {
      // toast(error, {
      //   type: "error",
      // });
      console.log(error);
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    // console.log("autorData", authorData);
    // console.log("rowSelected", rowSelected);
    const formData = new FormData();
    formData.append(
      "name",
      authorData.name ? authorData.name : rowSelected.name
    );
    formData.append(
      "image",
      authorData.img ? authorData.img : rowSelected.image_url
    );

    updateAuthor(rowSelected.id, formData);
    fetchAuthorList();
    closeHandler();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Author Name",
        accessor: "name",
      },
    ],
    []
  );

  const closeHandler = () => {
    setRowSelected(false);
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
                    setRowSelected(true);
                    setNew(true);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
            <TableAuthor
              columns={columns}
              data={author}
              setRowSelected={setRowSelected}
            ></TableAuthor>
          </div>
        </div>
      </div>
      {rowSelected && (
        <AuthorModal
          onClose={closeHandler}
          isNew={isNew}
          onConfirm={newAuthorHandler}
          onDelete={deleteHandler}
          onUpdate={updateHandler}
          setAuthorData={setAuthorData}
          editData={rowSelected}
        />
      )}
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
}

export default AuthorManagementPage;
