import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function ForgotPassword() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://luxury-x.vercel.app/user/forgotPassword",
        {
          username: data.username,
        }
      );

      setErrorMessage("");
      setEmailMessage("✅ Reset link sent to: " + res.data.email);
      reset();
    } catch (err) {
      setEmailMessage("");
      setErrorMessage(
        err.response?.data?.error ||
          "❌ Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Banner */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white flex-col justify-center px-12 py-10">
          <div className="max-w-lg">
            <h1 className="font-bold text-5xl leading-tight mb-4">
              Forgot Password?
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Don’t worry. We’ll send you a link to reset it securely.
            </p>
          </div>
          <img
            src="/assets/rightlogin.png"
            className="w-[80%] max-w-lg"
            alt="Forgot Password Illustration"
          />
        </div>

        {/* Form Section */}
        <div className="flex lg:flex-1 lg:items-center  justify-center px-6 py-10 bg-white">
          <div className="bg-white/90 p-8 rounded-2xl w-full max-w-lg shadow-xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your <strong>username or email</strong> to get the reset link
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username or Email
                </label>
                <input
                  {...register("username", {
                    required: "This field is required",
                  })}
                  type="text"
                  placeholder="Enter your username or email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {emailMessage && (
                <p className="text-sm text-green-600 mt-2">{emailMessage}</p>
              )}

              {errorMessage && (
                <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Send Reset Link
              </button>

              <div className="text-sm text-gray-700 mt-6 text-center space-y-1">
                <p>
                  <Link to="/login" className="text-emerald-600 hover:underline">
                    Back to Login
                  </Link>
                </p>
                <p>
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-emerald-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
