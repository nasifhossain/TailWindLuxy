import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function RegisterUser() {
  const [loading, setLoading] = useState(false);
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const [errorResponse, setErrorResponse] = useState('');
  const [usernameFlag, setUsernameFlag] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    axios.post('https://luxury-x.vercel.app/user/signup', {
      username: data.username,
      name: data.name,
      password: data.password,
      phone: data.phone,
      email: data.email,
      userType: 'user',
    })
    .then(res => {
      setLoading(false);
      reset();
      navigate('/login');
    })
    .catch(err => {
      setLoading(false);
      setErrorResponse(err.response?.data?.error || err.message);
    });
  };

  const handleUsernameChange = async (e) => {
    const username = e.target.value;
    if (!username.trim()) {
      setUsernameFlag(false);
      return;
    }

    try {
      const res = await axios.post('https://luxury-x.vercel.app/checkUsername', { username });
      setUsernameFlag(res.data.exists);
    } catch (err) {
      console.error("Username check failed:", err);
      setUsernameFlag(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9]">
        <Navbar/>
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Banner */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white flex-col justify-center px-12 py-10">
          <div className="max-w-lg">
            <h1 className="font-bold text-5xl leading-tight mb-4">
              Welcome to LuxuryX
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Create your account to access premium collections and exclusive offers.
            </p>
          </div>
          <img
            src="/assets/rightlogin.png"
            className="w-[80%] max-w-lg"
            alt="Luxury Illustration"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-1 items-center justify-center px-6 py-5  bg-white">
          <div className="bg-white/90 p-8 rounded-2xl w-full max-w-lg shadow-xl">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
              Create an Account
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Join LuxuryX and unlock exclusive collections
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Username */}
              <div>
                <label className="text-sm font-medium text-gray-700">Username</label>
                <input
                  {...register('username', {
                    required: 'Username is required',
                    pattern: {
                      value: /^(?!\d)[a-zA-Z0-9_]+$/,
                      message: 'Cannot start with a number, only letters/numbers/underscores',
                    },
                  })}
                  onChange={handleUsernameChange}
                  type="text"
                  placeholder="Enter username"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                />
                {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
                {usernameFlag && <p className="text-xs text-red-500 mt-1">Username already exists</p>}
              </div>

              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  {...register('name', { required: 'Full Name is required' })}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Minimum 8 characters required',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message: 'Must include uppercase, lowercase, number & special character',
                    },
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    minLength: { value: 10, message: 'At least 10 digits' },
                    maxLength: { value: 15, message: 'At most 15 digits' },
                  })}
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              {/* Error */}
              {errorResponse && <p className="text-sm text-red-600 mt-2">{errorResponse}</p>}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              {/* Redirect */}
              <p className="text-sm text-gray-700 text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-600 hover:underline">Sign In</Link>
              </p>
            </form>

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

export default RegisterUser;
