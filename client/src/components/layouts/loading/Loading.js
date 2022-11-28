import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { isLoadingSelector } from "../../../redux/selectors";
import classes from "./Loading.module.css";

function Loading(props) {
    const [isLoading, setIsLoading] = useState(true);
    const temp = useSelector(isLoadingSelector);

    useEffect(() => {
        setIsLoading(temp);
    }, [temp]);

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
