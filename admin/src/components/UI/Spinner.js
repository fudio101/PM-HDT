import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { usePromiseTracker } from "react-promise-tracker";
import classes from "./Spinner.module.css";

function Spinner() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <div className={classes.spinner}>
      {promiseInProgress && <HashLoader color="#495c83" />}
    </div>
  );
}

export default Spinner;
