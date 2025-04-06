import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function LoginPage() {
  const [errorResponse, setErrorResponse] = useState("");
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorResponse("");

    try {
      const res = await axios.post("https://luxury-x.vercel.app/user/login", {
        username: data.username,
        password: data.password,
      });

      const { token, username } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

      if (cart.length > 0) {
        await Promise.all(
          cart.map((item) =>
            axios.post(
              "https://luxury-x.vercel.app/cart",
              {
                username,
                idx: item.idx,
                title: item.title,
                thumbnail: item.thumbnail,
                price: item.price,
                quantity: item.quantity,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
          )
        );
        localStorage.removeItem("cart");
      }

      setLoading(false);
      reset();
      navigate("/product-list");
    } catch (err) {
      console.error("Login Error:", err);
      setLoading(false);
      setErrorResponse(
        err.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      <Navbar loginPage={true} />
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Section - Banner */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white flex-col justify-center px-12 py-10">
          <div className="max-w-lg">
            <h1 className="font-bold text-5xl leading-tight mb-4">
              Welcome Back
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Explore the finest collection of premium products handpicked for you.
            </p>
          </div>
          <img
            src="/assets/rightlogin.png"
            className="w-[80%] max-w-lg"
            alt="Luxury Illustration"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="flex flex-1 items-center justify-center px-6 py-10 bg-white">
          <div className="bg-white/90 p-8 rounded-2xl w-full max-w-lg shadow-xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Sign In</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Unlock premium collections & exclusive offers
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  type="text"
                  placeholder="Enter username"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Minimum 4 characters required",
                    },
                  })}
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {errorResponse && (
                <p className="text-sm text-red-600 mt-2">
                  {errorResponse}
                  {errorResponse.toLowerCase().includes("password") && (
                    <Link
                      to="/forgotPassword"
                      className="text-emerald-500 ml-2 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  )}
                </p>
              )}

              <p className="text-sm text-gray-700 mt-4 text-center">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-emerald-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>

            {/* Trusted Brands */}
            <div className="mt-8">
              <h3 className="text-xs text-gray-500 uppercase mb-3 text-center tracking-widest">
                Trusted By
              </h3>
              <div className="flex justify-center gap-6 flex-wrap">
                <img
                  src="https://brandeps.com/logo-download/H/H-&-M-logo-01.png"
                  alt="H&M"
                  className="h-10 grayscale hover:grayscale-0 transition"
                />
                <img
                  src="https://brandeps.com/logo-download/L/Levis-logo-vector-01.svg"
                  alt="Levi's"
                  className="h-10 grayscale hover:grayscale-0 transition"
                />
                <img
                  src="https://brandeps.com/logo-download/P/Polo-Ralph-Lauren-logo-vector-01.svg"
                  alt="Polo"
                  className="h-10 grayscale hover:grayscale-0 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
