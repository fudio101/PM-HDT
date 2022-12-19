import React, { useState } from "react";
import classes from "../asset/css/StandardMain.module.css";
import PackageTable from "../../components/tables/PackageTable";
import { ToastContainer } from "react-toastify";
import { getAllPackage } from "../../store/actions/packagesAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAllReceipt } from "../../store/actions/receiptAction";

function ReceiptManagementPage() {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Email",
        accessor: "user_email",
      },
      {
        Header: "Package Name",
        accessor: "subscription_package_name",
      },
      {
        Header: "Price (VND)",
        accessor: "subscription_package_price",
      },
      {
        Header: "Duration (day)",
        accessor: "subscription_package_duration",
      },
    ],
    []
  );
  const dispatch = useDispatch();
  const [receiptList, setReceiptList] = useState([]);

  const fetchAllReceipts = async () => {
    await setReceiptList(unwrapResult(await dispatch(getAllReceipt())));
  };
  useEffect(() => {
    fetchAllReceipts();
  }, []);
  // console.log(packageList);
  // const { error, author, success } = useSelector((state) => state.author);
  // const [authorData, setAuthorData] = useState();
  // const [authorList, setAuthorList] = useState([]);

  // const [isNew, setNew] = React.useState(false);
  // const [rowSelected, setRowSelected] = React.useState("");

  return (
    <>
      <div className={classes.main_title}>
        <p className={classes.font_weight_bold}>RECEIPTS MANAGEMENT</p>
      </div>

      <div className={classes.tile}>
        <PackageTable
          columns={columns}
          data={receiptList}
          navi="/receipt-manage"
          // setRowSelected={setRowSelected}
        ></PackageTable>
      </div>

      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
}

export default ReceiptManagementPage;
