import React from "react";

function NewPackagePage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center bg-slate-400 md:h-full h-fit w-full m-0">
        {/* <!-- Card --> */}
        <div className="w-2/3 p-2 h-full md:h-4/5 self-auto bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          {/* <!-- Image --> */}

          <img
            className="h-1/2 object-fill rounded-xl"
            src={require("../asset/img/logo1.png")}
            alt=""
          />

          <div className="p-2">
            {/* <!-- Heading --> */}
            <h2 className="font-bold text-lg md:text-2xl  mb-2 ">Premium</h2>

            <div className="grid grid-cols-2 gap-2 py-2">
              <div className="font-bold inline text-lg mb-2 ">
                Price: 199.000 VND
              </div>
              <div className="inline font-bold text-lg mb-2 text-center ">
                {" "}
                30 Days
              </div>
            </div>
            {/* <!-- Description --> */}
            <p className="text-sm text-gray-600 py-0 md:py-2">
              Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to
              our Youtube channel for more ...
            </p>
          </div>
          {/* cta */}
          <div className="m-2">
            <a
              role="button"
              href="#"
              className="absolute bottom-2 m-1 md:m-2 text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700"
            >
              Buy Plan
            </a>
          </div>
        </div>
        <div className="w-full my-4">
          <div className="md:py-4 ml-4">
            <label className="block font-semibold mb-2 text-lg text-gray-900 opacity-90 dark:text-white">
              Name
            </label>
            <input
              rows="4"
              className="block  p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Package name here..."
            ></input>
          </div>
          <div className="md:py-4 ml-4">
            <label className="block font-semibold mb-2 text-lg text-gray-900 opacity-90 dark:text-white">
              Price
            </label>
            <input
              rows="4"
              className="block  p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Package name here..."
            ></input>
          </div>
          <div className="md:py-4 ml-4">
            <label className="block font-semibold mb-2 text-lg text-gray-900 opacity-90 dark:text-white">
              Duration (Day)
            </label>
            <input
              rows="4"
              className="block  p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Package name here..."
            ></input>
          </div>
          <div className="md:py-4 ml-4">
            <label className="block font-semibold mb-2 text-lg text-gray-900 opacity-90 dark:text-white">
              Description
            </label>
            <textarea
              rows="4"
              className="block  p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write description here..."
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPackagePage;
