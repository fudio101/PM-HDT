import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../redux/reducers/userSlice";
import { userInfoSelector } from "../../redux/selectors";

function PrivateLayout() {
  const userInfo = useSelector(userInfoSelector);
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();
  // Get redirect location or provide fallback
  const from = location.state?.from || "/";

  //   console.log("private", location);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch, location]);

  useEffect(() => {
    if (userInfo) navigate(from, { replace: true });
  }, [userInfo, navigate, from, location]);

  return <Outlet />;
}

export default PrivateLayout;
