import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../redux/reducers/userSlice";
import {
    userSliceInfoSelector,
    userSliceTokenSelector,
} from "../../redux/selectors";

function PrivateLayout() {
    const userInfo = useSelector(userSliceInfoSelector);
    const userToken = useSelector(userSliceTokenSelector);
    const dispatch = useDispatch();
    let location = useLocation();
    const navigate = useNavigate();
    // Get redirect location or provide fallback
    const from = location.state?.from || "/";

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch, location]);

    useEffect(() => {
        if (location.pathname === "/verify-account") {
            if (userInfo?.isVerified) navigate(from, { replace: true });
            // console.log(location.pathname);
        } else if (userToken) navigate(from, { replace: true });
        // console.log(location.pathname);
    }, [userInfo, navigate, from, location, userToken]);

    return <Outlet />;
}

export default PrivateLayout;
