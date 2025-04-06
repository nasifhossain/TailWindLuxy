import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const { id, token } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({ mode: "onChange" });

    const password = watch("password", "");
    const confirmPassword = watch("confirmPassword", "");

    useEffect(() => {
        axios
            .get(`https://luxury-x.vercel.app/user/reset-password/${id}/${token}`)
            .then(res => {
                console.log(res.data.message);
                setErrorMessage('');
            })
            .catch(() => {
                setErrorMessage('❌ Invalid or Expired Link');
            });
    }, [id, token]);

    useEffect(() => {
        if (confirmPassword.length > 0 && password !== confirmPassword) {
            setPasswordMatchError("⚠️ Passwords do not match");
        } else {
            setPasswordMatchError("");
        }
    }, [password, confirmPassword]);

    const onSubmit = async (data) => {
        if (passwordMatchError) return;

        axios
            .put(`https://luxury-x.vercel.app/user/reset-password/${id}/${token}`, {
                password: data.password
            })
            .then(() => {
                alert("✅ Password Reset Successful!");
                navigate("/login");
            })
            .catch(() => {
                setErrorMessage("❌ Failed to reset password. Please try again.");
            });
    };

    if (errorMessage === '❌ Invalid or Expired Link') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfcf9] px-4">
                <h1 className="text-4xl font-bold text-red-600">404 - Error</h1>
                <p className="mt-4 text-lg text-red-500">{errorMessage}</p>
                <a href="/login" className="mt-6 text-emerald-600 underline font-medium">Go to Login Page</a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fdfcf9]">
            <div className="flex flex-col lg:justify-start lg:flex-row min-h-screen">

                {/* Left Banner */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white flex-col justify-center px-12 py-10">
                    <div className="max-w-lg">
                        <h1 className="font-bold text-5xl leading-tight mb-4">Reset Your Password</h1>
                        <p className="text-lg text-white/80 mb-8">
                            Secure your account and get back to shopping exclusive luxury drops.
                        </p>
                    </div>
                    <img
                        src="/assets/rightlogin.png"
                        className="w-[80%] max-w-lg"
                        alt="Luxury Illustration"
                    />
                </div>

                {/* Right Form */}
                <div className="flex flex-1 items-center justify-center px-6 py-5 bg-white">
                    <div className="bg-white/90 p-8 rounded-2xl w-full max-w-lg shadow-xl">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
                            Set a New Password
                        </h2>
                        <p className="text-sm text-gray-600 text-center mb-6">
                            Enter your new password below to recover access
                        </p>

                        {errorMessage && (
                            <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* New Password */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                                    {...register('password', {
                                        required: '⚠️ Password is required',
                                        minLength: { value: 8, message: '⚠️ Minimum 8 characters required' }
                                    })}
                                    onChange={(e) => setValue("password", e.target.value)}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                                    {...register('confirmPassword', {
                                        required: '⚠️ Confirm Password is required',
                                        minLength: { value: 8, message: '⚠️ Minimum 8 characters required' }
                                    })}
                                    onChange={(e) => setValue("confirmPassword", e.target.value)}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                                )}
                                {passwordMatchError && (
                                    <p className="text-red-500 text-sm mt-1">{passwordMatchError}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!!passwordMatchError}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-400"
                            >
                                Submit
                            </button>
                        </form>

                        {/* Login Redirect */}
                        <p className="text-sm text-gray-700 text-center mt-4">
                            Remembered your password?{" "}
                            <a href="/login" className="text-emerald-600 hover:underline">Sign In</a>
                        </p>

                        {/* Trusted Brands */}
                        <div className="mt-8 text-center">
                            <h3 className="text-gray-500 mb-4 font-medium">Trusted By</h3>
                            <div className="flex justify-center items-center gap-6">
                                <img src="https://brandeps.com/logo-download/H/H-&-M-logo-01.png" alt="H&M" className="h-8" />
                                <img src="https://brandeps.com/logo-download/L/Levis-logo-vector-01.svg" alt="Levis" className="h-8" />
                                <img src="https://brandeps.com/logo-download/P/Polo-Ralph-Lauren-logo-vector-01.svg" alt="Polo" className="h-8" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ResetPassword;
