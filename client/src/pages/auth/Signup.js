import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "../../api/authApi";

function Signup() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const submitFormHandle = async () => {
        try {
            const response = await authApi.signup(
                watch("name"),
                watch("email"),
                watch("password"),
                watch("passwordConfirmation")
            );
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-600 uppercase">
                    Đăng Ký
                </h1>
                <form
                    className="mt-6"
                    onSubmit={handleSubmit(submitFormHandle)}
                >
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Tên
                        </label>
                        <input
                            {...register("name", {
                                required: "Tên là bắt buộc",
                            })}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-indigo-600 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.name && (
                            <p class="mt-2 text-pink-600 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
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
                            <p class="mt-2 text-pink-600 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Mật Khẩu
                        </label>
                        <input
                            {...register("password", {
                                required: "Mật Khẩu là bắt buộc",
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                    message:
                                        "Mật khẩu phải chứa ít nhất 1 chữ số, 1 ký tự in hoa, 1 ký tự thường và dài ít nhất 8 ký tự",
                                },
                            })}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-indigo-600 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.password && (
                            <p class="mt-2 text-pink-600 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Xác Nhận Mật Khẩu
                        </label>
                        <input
                            {...register("passwordConfirmation", {
                                required: "Xác Nhận Mật Khẩu là bắt buộc",
                                validate: (value) =>
                                    value === watch("password", "") ||
                                    "Mật khẩu không khớp",
                            })}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-indigo-600 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        {errors.passwordConfirmation && (
                            <p class="mt-2 text-pink-600 text-sm">
                                {errors.passwordConfirmation.message}
                            </p>
                        )}
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-purple-600">
                            Đăng Ký
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Đã có tài khoản?
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        Đăng Nhập
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup;
