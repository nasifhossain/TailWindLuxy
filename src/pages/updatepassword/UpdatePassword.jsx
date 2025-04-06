import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

function UpdatePassword() {
  const { register, handleSubmit, watch } = useForm();
  const { username } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const validatePasswords = () => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setError("⚠️ Passwords do not match!");
    } else {
      setError("");
    }
  };

  const onSubmit = (data) => {
    setError("");
    setMessage("");

    axios
      .put(
        `https://luxury-x.vercel.app/user/updatePassword/${username}`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/");
          localStorage.clear();
        }, 5000);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Something went wrong.");
      });
  };

  return (
    <div className="bg-[#fdfcf9] ">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Banner */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white flex-col justify-center px-12 py-10">
          <div className="max-w-lg">
            <h1 className="font-bold text-5xl leading-tight mb-4">
              Secure Your Account
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Change your password regularly to keep your luxury experience
              safe.
            </p>
          </div>
          <img
            src="/assets/rightlogin.png"
            className="w-[80%] max-w-lg"
            alt="Security Illustration"
          />
        </div>

        {/* Right Section - Update Password Form */}
        <div className="flex flex-1 flex-col items-center lg:justify-center px-6 py-10 bg-white">
          <div className="bg-white/90 p-8 rounded-2xl w-full max-w-lg shadow-xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
              Update Your Password
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Make your account more secure with a new password.
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            {message && (
              <p className="text-emerald-600 text-sm text-center mb-4">
                {message} Redirecting...
              </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Old Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Old Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter old password"
                  {...register("oldPassword", { required: true })}
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter new password"
                  {...register("newPassword", { required: true })}
                  onChange={validatePasswords}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Confirm new password"
                  {...register("confirmPassword", { required: true })}
                  onChange={validatePasswords}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-400"
                disabled={!!error}
              >
                Update Password
              </button>
            </form>

            <p className="text-sm text-center text-gray-700 mt-4">
              Go back to{" "}
              <Link to="/" className="text-emerald-600 hover:underline">
                Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
