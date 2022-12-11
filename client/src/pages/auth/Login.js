import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { login } from "../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // Get redirect location or provide fallback
    const from = location.state?.from || "/";

    const submitFormHandle = async () => {
        try {
            await dispatch(
                login({
                    email: watch("email"),
                    password: watch("password"),
                })
            );
            navigate(from, { replace: true });
        } catch (error) {}
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-600 uppercase">
                    Đăng Nhập
                </h1>
                <form
                    className="mt-6"
                    onSubmit={handleSubmit(submitFormHandle)}
                >
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email là bắt buộc",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email không hợp lệ",
                                },
                            })}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-indigo-600 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.email && (
                            <p className="mt-2 text-pink-600 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Mật Khẩu
                        </label>
                        <input
                            {...register("password", {
                                required: "Mật Khẩu là bắt buộc",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Mật khẩu phải chứa ít nhất 1 chữ số, 1 ký tự in hoa, 1 ký tự thường và dài ít nhất 8 ký tự",
                                },
                            })}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-indigo-600 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.password && (
                            <p className="mt-2 text-pink-600 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <Link
                        to="/forgot-pasword"
                        className="text-xs text-indigo-600 hover:underline"
                    >
                        Quên mật khẩu?
                    </Link>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-purple-600">
                            Đăng Nhập
                        </button>
                    </div>
                </form>
                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>
                <div className="flex mt-4 gap-x-2">
                    <button
                        type="button"
                        className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                    >
                        <BsGoogle className="w-5 h-5 fill-current" />
                    </button>
                    <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                        <BsFacebook className="w-5 h-5 fill-current" />
                    </button>
                    <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                        </svg>
                    </button>
                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Chưa có tài khoản?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        Đăng Ký
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
