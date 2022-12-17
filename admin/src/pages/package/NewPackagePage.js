import React, { useState } from "react";
import PackageForm from "../../components/package/PackageForm";

function NewPackagePage() {
  const [packageValue, setPackageValue] = useState();
  console.log(packageValue);
  return (
    <>
      <div className="h-full">
        <PackageForm setPackageValue={setPackageValue} />
        <div className="flex justify-center  w-full">
          <button className="inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
            New Package
          </button>
        </div>
      </div>
    </>
  );
}

export default NewPackagePage;
