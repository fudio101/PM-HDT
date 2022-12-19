import { useForm } from "react-hook-form";
import authApi from "../../api/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/reducers/userSlice";
import { toast } from "react-toastify";

function VerifyAccount() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      verifyCode: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from || "/";

  const resendVerifyCodeHandler = async () => {
    try {
      const res = await authApi.resendCode();
      toast(res.data.message);

      if (res.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, {
        type: "error",
      });
    }
  };

  const submitFormHandle = async () => {
    try {
      await authApi.verify(watch("verifyCode"));
      dispatch(getUserInfo(true));
      navigate(from, { replace: true });
    } catch (error) {}
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div className="w-96 p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 uppercase ">
          Xác Thực Tài Khoản
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(submitFormHandle)}>
          <div className="mb-2">
            <label className="text-center block text-md font-semibold text-gray-800 opacity-90">
              Mã Xác Thực
            </label>
            <input
              {...register("verifyCode", {
                required: "Mã Xác Thực là bắt buộc",
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: "Mã Xác Thực không hợp lệ",
                },
              })}
              className="block text-center w-full px-4 py-2 mt-2 text-indigo-600 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.verifyCode && (
              <p className="mt-2 text-pink-600 text-sm text-center">
                {errors.verifyCode.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-purple-600">
              Xác Thực
            </button>
          </div>
        </form>

        <div className="mt-8 text-xs font-semibold text-center text-gray-700">
          Chưa Nhận Được Email
          <div
            className="inline text-sm font-semibold text-indigo-600 hover:underline ml-1 cursor-pointer hover:text-indigo-400"
            onClick={resendVerifyCodeHandler}
          >
            Gửi Lại
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
