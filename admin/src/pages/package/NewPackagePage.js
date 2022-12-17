import React, { useState } from "react";
import PackageForm from "../../components/package/PackageForm";
import { newPackage } from "../../store/actions/packagesAction";

import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewPackagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState();
  console.log(packageData);
  const newPackageHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(packageData)) {
        formData.append(key, value);
      }

      unwrapResult(
        await dispatch(newPackage({ subscription_packages: formData }))
      );

      toast("New Package Added Successfully ", {
        type: "success",
      });

      setTimeout(() => {
        navigate("/packages-manage");
      }, 2000);
    } catch (error) {
      // toast(error, {
      //   type: "error",
      // });
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-full">
        <div className="my-8">
          <PackageForm setPackageData={setPackageData} />
        </div>
        <div className="flex justify-center  w-full">
          <button
            onClick={newPackageHandler}
            className="inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
          >
            New Package
          </button>
        </div>
      </div>
    </>
  );
}

export default NewPackagePage;
