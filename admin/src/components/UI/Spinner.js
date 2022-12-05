import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { usePromiseTracker } from "react-promise-tracker";
import classes from "./Spinner.module.css";

function Spinner() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <>
      {promiseInProgress && (
        <div className={classes.spinner__wrapper}>
          <div className={classes.spinner}>
            <HashLoader color="#495c83" />
          </div>
        </div>
      )}
    </>
  );
}

export default Spinner;
