import React, { useEffect, useState } from "react";
import PackageForm from "../../components/package/PackageForm";
import {
  delPackage,
  getPackage,
  updatePackage,
} from "../../store/actions/packagesAction";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import confirm from "react-alert-confirm";

function PackageEditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currPackage, setCurrPackage] = useState();
  const [packageData, setPackageData] = useState();

  const getCurrPackage = async (id) => {
    try {
      setCurrPackage(unwrapResult(await dispatch(getPackage(id))));
      // console.log(unwrapResult(await dispatch(getPackage(id))));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrPackage(id);
  }, []);

  const updatePackageHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(packageData)) {
        formData.append(key, value);
      }
      unwrapResult(
        await dispatch(
          updatePackage({ id: id, subscription_packages: formData })
        )
      );
      toast("Package Updated Successfully", {
        type: "success",
      });

      setTimeout(() => {
        navigate("/packages-manage");
      }, 1000);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  const onDeletePackage = async () => {
    try {
      unwrapResult(await dispatch(delPackage(id)));
      toast("Package Deleted Successfully", {
        type: "success",
      });
      setTimeout(() => {
        navigate("/packages-manage");
      }, [1000]);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  const deletePackageHandler = async (e) => {
    e.preventDefault();
    confirm({
      title: "Delete",
      language: "en",
      content: <h2>Confirm To Delete</h2>,
      onOk: onDeletePackage,
    });
  };

  return (
    <>
      <div className="h-full">
        <div className="my-7">
          <PackageForm
            currPackage={currPackage}
            setPackageData={setPackageData}
          />
        </div>
        <div className="flex space-x-5 justify-center  w-full">
          <button
            onClick={updatePackageHandler}
            className="inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-yellow-500 rounded-full shadow ripple hover:shadow-lg hover:bg-yellow-600 focus:outline-none"
          >
            Update
          </button>
          <button
            onClick={deletePackageHandler}
            className="inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default PackageEditPage;
