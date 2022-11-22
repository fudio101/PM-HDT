import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import Table from "../components/tables/Table";
import Button from "../components/UI/Button";

import { useDispatch, useSelector } from "react-redux";
import { getAllCate, newCate, delCate } from "../store/actions/categoryAction";

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

  const { category, error, success } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const fetchCateList = () => {
    dispatch(getAllCate());
  };

  useEffect(() => {
    fetchCateList();
  }, []);

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
                  onClick={() => alert("add btn effected")}
                >
                  Add
                </Button>
              </div>
            </div>
            <Table columns={columns} data={category}></Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryManagementPage;
