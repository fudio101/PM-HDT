import React, { useState } from "react";
import classes from "../asset/css/StandardMain.module.css";
import PackageTable from "../../components/tables/PackageTable";
import Button from "../../components/UI/Button";
import { ToastContainer } from "react-toastify";
import { getAllPackage } from "../../store/actions/packagesAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

function PackageManagementPage() {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Price (VND)",
        accessor: "price",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [packageList, setPackageList] = useState([]);

  const fetchAllPackages = async () => {
    await setPackageList(unwrapResult(await dispatch(getAllPackage())));
    console.log(unwrapResult(await dispatch(getAllPackage())));
  };
  useEffect(() => {
    fetchAllPackages();
  }, []);
  // console.log(packageList);
  // const { error, author, success } = useSelector((state) => state.author);
  // const [authorData, setAuthorData] = useState();
  // const [authorList, setAuthorList] = useState([]);

  // const [isNew, setNew] = React.useState(false);
  const [rowSelected, setRowSelected] = React.useState("");

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>PACKAGES MANAGEMENT</p>
      </div>

      <div className={classes.tile}>
        <div className={`${classes.row} ${classes.element_button}`}>
          <Button
            className={classes.add_btn}
            onClick={() => {
              navigate("/new-packages");
            }}
          >
            Add
          </Button>
        </div>
        <PackageTable
          columns={columns}
          data={packageList}
          setRowSelected={setRowSelected}
        ></PackageTable>
      </div>

      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
}

export default PackageManagementPage;
