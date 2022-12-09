import { Bars } from "react-loader-spinner";
import classes from "./Loading.module.css";

function Loading({ isLoading }) {
    return (
        <div
            className={`${classes.container} ${
                isLoading ? classes.active : ""
            }`}
        >
            <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass={classes.spinner}
                visible={true}
            />
        </div>
    );
}

export default Loading;
