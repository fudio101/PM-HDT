import React from "react";
import PackageForm from "../../components/package/PackageForm";

function PackageEditPage() {
  return (
    <>
      <div className="h-full">
        <PackageForm />
        <div className="flex space-x-5 justify-center  w-full">
          <button className="inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-yellow-500 rounded-full shadow ripple hover:shadow-lg hover:bg-yellow-600 focus:outline-none">
            Edit
          </button>
          <button className="inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default PackageEditPage;
