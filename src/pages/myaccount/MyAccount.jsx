import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar/Navbar";

function MyAccount() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [redirectMessage, setRedirectMessage] = useState("");
  const[loading,SetLoading] = useState(false);

  const onSubmit = (data) => {
    setError("");
    setMessage("");
    setRedirectMessage("");
    SetLoading(true);
    axios
      .put(
        `https://luxury-x.vercel.app/user/${username}`,
        {
          email: data.email,
          phone: data.phone,
          name: data.name,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setMessage("Account updated successfully!");
        setRedirectMessage("Redirecting to homepage in 5 seconds...");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Something went wrong");
      }).finally(()=>{
        SetLoading(false);
      });
  };

  useEffect(() => {
    if (username !== localStorage.getItem("username")) {
      navigate("/login");
      return;
    }

    axios
      .get(`https://luxury-x.vercel.app/user/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const userData = res.data.details;
        Object.keys(userData).forEach((key) => setValue(key, userData[key]));
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Something went wrong");
      });
  }, [username, navigate, setValue]);

  if (username !== localStorage.getItem("username")) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-3">
          <svg
            className="animate-spin h-10 w-10 text-emerald-600"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading Account Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfcf9] lg:min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* Left Section - Banner */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white flex-col justify-center px-12 py-10">
          <div className="max-w-lg">
            <h1 className="font-bold text-5xl leading-tight mb-4">
              Your Account
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Manage your personal details and stay up to date with us.
            </p>
          </div>
          <img
            src="/assets/rightlogin.png"
            className="w-[80%] max-w-md"
            alt="Account Illustration"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-1 items-center justify-center px-6 py-10 bg-white">
          <div className="bg-white/90 p-8 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
              My Account
            </h2>

            {error && (
              <p className="text-sm text-red-500 text-center mb-4">{error}</p>
            )}
            {message && (
              <p className="text-sm text-emerald-600 text-center mb-2">
                {message}
              </p>
            )}
            {redirectMessage && (
              <p className="text-sm text-emerald-500 text-center mb-4">
                {redirectMessage}
              </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  {...register("name")}
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100"
                  {...register("username")}
                  placeholder="Username"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  {...register("email")}
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  {...register("phone")}
                  placeholder="Phone"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password (Required for Update)
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  type="password"
                  {...register("password")}
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <input
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100"
                  {...register("userType")}
                  placeholder="User Type"
                  disabled
                />
              </div>
              <button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition"
                type="submit"
              >
                Update Account
              </button>
            </form>

            <button
              className="w-full mt-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-semibold py-2 px-4 rounded-md transition"
              onClick={() => navigate(`/updatePassword/${username}`)}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
