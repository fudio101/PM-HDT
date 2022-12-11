import React from "react";
import { Link, NavLink } from "react-router-dom";

function VerifyAlert(props) {
  return (
    <div className={`py-1 bg-orange-400 ${props.isVisible ? "hidden" : ""}`}>
      <div
        className={`text-xs opacity-90 flex flex-row justify-center items-center font-semibold text-gray-800 `}
      >
        Tài Khoản Của Bạn Chưa Được Xác Thực!{" "}
        <Link
          className=" italic  text-xs  opacity-70 underline hover:opacity-100 px-2 font-semibold"
          to={"/verify-account"}
        >
          Xác Thực Ngay
        </Link>
      </div>
    </div>
  );
}

export default VerifyAlert;
