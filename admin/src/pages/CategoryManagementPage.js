import React from "react";
import Table from "../components/tables/Table";

import classes1 from "./asset/css/ComicMana.module.css";
import classes from "./asset/css/StandardMain.module.css";

function CategoryManagementPage() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "actions",
        accessor: "actions",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        firstname: "firstname1",
        lastName: "hau1",
        age: 10,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname10",
        lastName: "hau2",
        age: 11,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname9",
        lastName: "hau3",
        age: 10,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname8",
        lastName: "hau4",
        age: 11,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname7",
        lastName: "hau5",
        age: 10,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname6",
        lastName: "hau6",
        age: 11,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname5",
        lastName: "hau7",
        age: 10,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname4",
        lastName: "hau8",
        age: 11,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname3",
        lastName: "hau9",
        age: 10,
        visits: "...",
        status: "...",
        progress: "...",
      },
      {
        firstname: "firstname2",
        lastName: "hau10",
        age: 11,
        visits: "...",
        status: "...",
        progress: "...",
      },
    ],
    []
  );
  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>CATEGORY MANAGEMENT</p>
      </div>

      <div className={classes1.col_md_12}>
        <div className={classes1.tile}>
          <div className={classes1.tile_body}>
            <div classname={`${classes1.row} ${classes1.element_button}`}>
              <div classname={classes1.col_sm_2}>
                <div
                  classname={`${classes1.btn} ${classes1.btn_add} ${classes1.btn_sm}`}
                  title="Thêm"
                >
                  Tạo mới truyện tranh
                </div>
              </div>
              <div classname={classes1.col_sm_2}>
                <div
                  classname={`${classes1.btn} ${classes1.btn_delete} ${classes1.btn_sm}`}
                  type="button"
                  title="Nhập"
                >
                  Tải từ file
                </div>
              </div>
              <div classname={classes.col_sm_2}>
                <div
                  classname={`${classes1.btn} ${classes.btn_delete} ${classes1.btn_sm}`}
                  type="button"
                  title="Xóa"
                >
                  <i classname={"fas fa-trash-alt"}></i>
                  Xóa tất cả
                </div>
              </div>
            </div>
            <Table columns={columns} data={data}></Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryManagementPage;
