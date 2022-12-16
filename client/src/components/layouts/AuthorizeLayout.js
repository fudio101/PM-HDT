import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    userSliceInfoSelector,
    userSliceStatusSelector,
    userSliceTokenSelector,
} from "../../redux/selectors";

function AuthorizeLayout() {
    const userToken = useSelector(userSliceTokenSelector);
    const userInfo = useSelector(userSliceInfoSelector);
    const userSliceStatus = useSelector(userSliceStatusSelector);
    const navigate = useNavigate();
    const location = useLocation();

    // check login
    useEffect(() => {
        if (!userToken) {
            toast.warning("Bạn cần đăng nhập trước");
            navigate("/login", { state: { from: location } });
        }
    }, [navigate, location, userToken]);

    // check verify
    useEffect(() => {
        if (
            userToken &&
            userSliceStatus === "idle" &&
            userInfo &&
            !userInfo.is_verified
        ) {
            toast.warning("Bạn cần xác minh tài khoản trước");
            navigate("/verify-account", { state: { from: location } });
        }
    }, [navigate, location, userInfo, userSliceStatus, userToken]);

    return (
        <>
            <Outlet />
        </>
    );
}

export default AuthorizeLayout;
