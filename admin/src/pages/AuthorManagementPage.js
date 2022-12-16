import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import Button from "../components/UI/Button";
import TableAuthor from "../components/tables/TableAuthor";
import AuthorModal from "../components/Modal/AuthorModal";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllAuthor,
  newAuthor,
  delAuthor,
  update,
} from "../store/actions/authorAction";

// import authorAPI from "../api/authorAPI";

import classes from "./asset/css/StandardMain.module.css";
import { unwrapResult } from "@reduxjs/toolkit";

function AuthorManagementPage() {
  const { error, author, success } = useSelector((state) => state.author);

  const [authorData, setAuthorData] = useState();
  // const [authorList, setAuthorList] = useState([]);

  const [isNew, setNew] = React.useState(false);
  const [rowSelected, setRowSelected] = React.useState("");

  const dispath = useDispatch();

  // get all authors
  const fetchAuthorList = async () => {
    setTimeout(() => {
      unwrapResult(dispath(getAllAuthor()));
    }, 200);
  };

  useEffect(() => {
    dispath(getAllAuthor());
  }, [dispath]);

  useEffect(() => {
    toast(error, {
      type: "error",
    });
  }, [error]);

  // add new author
  const newAuthorHandlerAction = async () => {
    try {
      const formData = new FormData();
      formData.append("name", authorData.name);
      formData.append("image", authorData.img);
      unwrapResult(await dispath(newAuthor({ author: formData })));

      toast("New Author Added", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }

    fetchAuthorList();
    closeHandler();
  };

  const newAuthorHandler = (e) => {
    e.preventDefault();
    trackPromise(newAuthorHandlerAction());
  };

  // Delete An author

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      unwrapResult(await dispath(delAuthor(rowSelected.id)));
      if (success === true) {
        toast("Author Has Been Deleted", {
          type: "success",
        });
      }
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }

    fetchAuthorList();
    closeHandler();
  };

  //update an author

  // const updateAuthor = async (e) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", authorData.name);
  //     formData.append("image", authorData.img);
  //     console.log(rowSelected.id);
  //     unwrapResult(
  //       dispath(await update({ id: rowSelected.id, author: formData }))
  //     );
  //     toast("Author Updated", {
  //       type: "success",
  //     });
  //   } catch (error) {
  //     toast(error, {
  //       type: "error",
  //     });
  //   }
  // };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", authorData.name);
      formData.append("image", authorData.img);
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
        if (pair[1] === "undefined" || pair[1] === "null") {
          formData.delete(pair[0]);
        }
      }
      unwrapResult(
        dispath(await update({ id: rowSelected.id, author: formData }))
      );
      toast("Author Updated", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }

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

      <div className={classes.tile}>
        <div className={`${classes.row} ${classes.element_button}`}>
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
        <TableAuthor
          columns={columns}
          data={author}
          setRowSelected={setRowSelected}
        ></TableAuthor>
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
