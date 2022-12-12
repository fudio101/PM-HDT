import React, { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import VerifyAlert from "./header/VerifyAlert";
import Header from "./header/Header";
import Navigator from "./category/Navigator";
import classes from "./Layout.module.css";
import Footer from "./footer/Footer";

import { Outlet } from "react-router-dom";
import TopUpButton from "../ui/TopUpButton";
import Loading from "./loading/Loading";
import { useSelector } from "react-redux";
import {
    isLoadingSelector,
    isMainLoadingSelector,
    userSliceInfoSelector,
    userSliceTokenSelector,
} from "../../redux/selectors";

function Layout() {
    const scroll = useRef(null);
    const { ref, inView } = useInView({
        threshold: 1,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isMainLoading, setIsMainLoading] = useState(true);
    const isLoading_ = useSelector(isLoadingSelector);
    const isMainLoading_ = useSelector(isMainLoadingSelector);
    const userInfo = useSelector(userSliceInfoSelector);
    const userToken = useSelector(userSliceTokenSelector);

    useEffect(() => {
        setIsLoading(isLoading_);
    }, [isLoading_]);

    useEffect(() => {
        setIsMainLoading(isMainLoading_);
    }, [isMainLoading_]);

    return (
        <Fragment>
            <div
                className={`${classes.top_section} ${
                    isMainLoading && "hidden"
                }`}
            >
                <VerifyAlert isVisible={userToken && !userInfo?.is_verified} />
                <Header isVisible={inView} />
                <Navigator
                    onClick={() => {
                        scroll.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                />
            </div>
            <div ref={ref} />

            {/* all content show here */}
            <div className={classes.main}>
                <Outlet />
                <TopUpButton />
                <Loading isLoading={isLoading} />
            </div>
            <div ref={scroll}></div>
            <Footer />
        </Fragment>
    );
}

export default Layout;
