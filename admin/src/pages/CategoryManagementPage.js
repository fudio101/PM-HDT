import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Table from "../components/tables/Table";
import Button from "../components/UI/Button";
import CategoryModal from "../components/Modal/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCate,
  newCate,
  delCate,
  update,
} from "../store/actions/categoryAction";
import { unwrapResult } from "@reduxjs/toolkit";

import classes from "./asset/css/StandardMain.module.css";

function CategoryManagementPage() {
  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Category",
        accessor: "name",
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const [isNew, setNew] = React.useState(false);
  const [rowSelected, setRowSelected] = React.useState("");
  const [cateData, setCateData] = useState({ name: "not set" });
  const [categories, setCategories] = useState([]);

  const fetchCategoryList = async () => {
    setCategories(unwrapResult(await dispatch(getAllCate())));
  };

  //close modal
  const closeHandler = () => {
    setRowSelected(false);
    setNew(false);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const newCateHandler = async (e) => {
    try {
      e.preventDefault();
      const action = await dispatch(newCate({ name: cateData.name }));
      unwrapResult(action);

      toast("Category Added Successfully", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
    fetchCategoryList();
    closeHandler();
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(delCate(rowSelected.id));
      unwrapResult(action);
      toast("Category Deleted Successfully", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }

    fetchCategoryList();
    closeHandler();
  };
  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      const action = await dispatch(
        update({ category: { name: cateData.name }, id: rowSelected.id })
      );
      unwrapResult(action);
      toast("Category Updated Successfully", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }

    fetchCategoryList();
    closeHandler();
  };

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>CATEGORY MANAGEMENT</p>
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
            <Table
              columns={columns}
              data={categories}
              setRowSelected={setRowSelected}
            ></Table>
          </div>
        </div>
      </div>
      {rowSelected && (
        <CategoryModal
          onClose={closeHandler}
          isNew={isNew}
          onConfirm={newCateHandler}
          onDelete={deleteHandler}
          onUpdate={updateHandler}
          setCateData={setCateData}
          editData={rowSelected}
        />
      )}
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
}

export default CategoryManagementPage;
