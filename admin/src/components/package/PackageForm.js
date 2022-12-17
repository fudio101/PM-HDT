import React, { useEffect, useRef } from "react";
import CurrencyFormat from "react-currency-format";
import Card from "../UI/Card";

const initPackageValue = {
  name: "Package Name",
  price: 1000000,
  description: "package description...",
  duration: 30,
  duration_text: "30 Ngày",
  image_url: require("./assets/imgs/logo1.png"),
};

function PackageForm(props) {
  const ref = useRef();
  const bottom = useRef();
  const [packageValue, setPackageValue] = React.useState();
  const [imageThumbnail, setImageThumbnail] = React.useState(
    initPackageValue.image_url
  );

  const packageInputHandler = (e) => {
    const { value, name } = e.target;
    setPackageValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setPackageValue(props.currPackage);
  }, [props.currPackage]);

  useEffect(() => {
    props.setPackageData(packageValue);
  }, [packageValue]);

  const imgInputHandler = (e) => {
    const img = e.target.files[0];
    setPackageValue((prev) => {
      return {
        ...prev,
        image: img,
      };
    });
    setImageThumbnail(URL.createObjectURL(img));
  };
  console.log(packageValue);
  const priceChangeHandler = (e) => {
    setPackageValue((prev) => {
      return {
        ...prev,
        price: ref.current.state.numAsString,
      };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-2 place-items-center md:h-full h-fit w-full m-0 ">
      <Card className="col-span-3 w-3/4 relative">
        {/* <!-- Image --> */}
        <img
          className="h-1/2 object-fill rounded-xl"
          src={
            packageValue?.image_url ? packageValue.image_url : imageThumbnail
          }
          alt=""
        />

        <div className="p-2">
          {/* <!-- Heading --> */}
          <h2 className="font-bold text-lg md:text-2xl  mb-2 ">
            {packageValue?.name ? packageValue?.name : initPackageValue.name}
          </h2>

          <div className="grid grid-cols-2 gap-2 py-2">
            <CurrencyFormat
              value={ref.current?.state.numAsString || initPackageValue?.price}
              thousandSeparator={true}
              suffix={" VND "}
              displayType={"text"}
              className="font-bold inline text-lg mb-2 "
            ></CurrencyFormat>
            <div className="inline font-bold text-lg mb-2 mr-4 text-right  ">
              {packageValue
                ? packageValue.duration_text
                : initPackageValue.duration_text}
            </div>
          </div>
          {/* <!-- Description --> */}
          <p className="text-sm text-gray-600 py-0 md:py-2">
            {packageValue
              ? packageValue.description
              : initPackageValue?.description}
          </p>
        </div>
        <div className="flex justify-center">
          <button className="absolute bottom-2 font-semibold  text-white bg-sky-400 py-3 rounded-md hover:bg-sky-600 inline-block w-11/12  text-center">
            Đăng ký
          </button>
        </div>
      </Card>
      <Card className="col-span-4 w-11/12">
        <div className="md:py-1 ml-4">
          <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
            Name
          </label>
          <input
            onMouseDown={() => {
              bottom.current.scrollIntoView({ behavior: "smooth" });
            }}
            value={packageValue?.name}
            name="name"
            className="block  p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Package name here..."
            onChange={packageInputHandler}
          ></input>
        </div>
        <div className="md:py-1 ml-4">
          <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
            Price
          </label>
          <CurrencyFormat
            ref={ref}
            value={packageValue?.price}
            className="block  p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Price here..."
            thousandSeparator={true}
            onChange={priceChangeHandler}
            suffix={" VND"}
          />
          {/* <input></input> */}
        </div>
        <div className="md:py-1 ml-4">
          <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
            Duration Text
          </label>
          <input
            name="duration_text"
            type="text"
            value={packageValue?.duration_text}
            onChange={packageInputHandler}
            className="block p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Duration..."
          ></input>
        </div>
        <div className="md:py-1 ml-4">
          <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
            Duration (Day)
          </label>
          <input
            name="duration"
            type="number"
            value={packageValue?.duration}
            onChange={packageInputHandler}
            className="block p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Duration..."
          ></input>
        </div>

        <div className="md:py-1 ml-4">
          <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
            Image
          </label>
          <label className="block ">
            <label className="sr-only">Choose File</label>
            <input
              type="file"
              onChange={imgInputHandler}
              accept="image/png, image/jpeg"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </label>
        </div>
        <div className="md:py-1 ml-4">
          <label className="block font-semibold mb-1 text-lg text-gray-900 opacity-90 dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={packageValue?.description}
            onChange={packageInputHandler}
            className="block  p-2.5 w-11/12 text-sm text-gray-900 opacity-90 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write description here..."
          ></textarea>
        </div>
      </Card>
      <div ref={bottom} />
    </div>
  );
}

export default PackageForm;
