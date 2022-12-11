import React from "react";

// import classes from "./Wrapper.module.css";
function Wrapper(props) {
  return (
    // <div className={`${classes.wrap_card} ${props.className}`}>
    //   {props.children}
    // </div>

    <div className="w-auto h-auto bg-rose-300">{props.children}</div>
  );
}

export default Wrapper;
