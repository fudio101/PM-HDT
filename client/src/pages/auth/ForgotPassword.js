import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "../../api/authApi";

function ForgotPassword() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    const submitFormHandle = async () => {
        try {
            const response = await authApi.forgotPassword(watch("email"));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-600 uppercase">
                    Quên mật khẩu
                </h1>
                <form
                    className="mt-6"
                    onSubmit={handleSubmit(submitFormHandle)}
                >
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
                            <p className="mt-2 text-pink-600 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-purple-600">
                            Tìm Kiếm
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Đã có tài khoản?
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:underline ml-1"
                    >
                        Đăng Nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
