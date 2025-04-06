import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ loginPage }) {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem("username");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50  w-full backdrop-blur-md shadow-md bg-orange-100/90 border-b border-gray-300 ">
      <div className="w-full flex flex-row justify-between items-center px-3 py-2 md:px-10">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-red-700 font-serif cursor-pointer"
        >
          LuxuryX
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex text-blue-500 font-semibold gap-6">
          <Link
            to="/product-list"
            className="hover:text-pink-600 cursor-pointer transition"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-pink-600 cursor-pointer transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-pink-600 cursor-pointer transition"
          >
            Contact
          </Link>
        </nav>

        {/* Auth & Cart */}
        <div className="hidden sm:flex items-center gap-4">
          {loginStatus ? (
            <div
              className="relative text-purple-800 flex flex-col cursor-pointer"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="py-1 px-4 rounded-md bg-teal-300 hover:border-2 border-green-400 transition">
                {loginStatus} ▼
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 rounded-md bg-cyan-300 shadow-md flex flex-col gap-1 min-w-[150px] z-20 py-2">
                  <Link
                    to={`/myAccount/${loginStatus}`}
                    className="px-4 py-1 hover:bg-yellow-400 hover:text-black rounded-md cursor-pointer transition"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="px-4 py-1 hover:bg-yellow-400 hover:text-black rounded-md cursor-pointer transition"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-1 text-red-600 hover:text-white hover:bg-red-600 rounded-md cursor-pointer transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : !loginPage && (
            <Link
              to="/login"
              className="text-blue-800 border-2 border-yellow-500 px-3 py-1 rounded hover:bg-blue-600 hover:text-white cursor-pointer transition"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => navigate("/cart")}
            className="text-purple-600 border border-yellow-400 p-2 rounded hover:bg-yellow-400 hover:text-black cursor-pointer transition"
          >
            <FaShoppingCart size={20} />
          </button>
        </div>

        {/* Mobile Nav & Cart */}
        <div className="flex sm:hidden gap-3 items-center">
          <button
            onClick={() => navigate("/cart")}
            className="text-purple-600 border border-yellow-400 p-2 rounded hover:bg-yellow-400 hover:text-black cursor-pointer transition"
          >
            <FaShoppingCart size={20} />
          </button>
          <button
            className="text-yellow-400 text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-3/4 max-w-xs h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 shadow-xl z-50 px-6 py-6 flex flex-col gap-8 transition-all duration-300">
          <div className="flex justify-end">
            <button
              className="text-2xl text-gray-700 hover:text-yellow-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          {loginStatus ? (
            <>
              <Link
                to={`/myAccount/${loginStatus}`}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-yellow-600 cursor-pointer transition"
              >
                My Account
              </Link>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-yellow-600 cursor-pointer transition"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-lg font-medium text-red-600 hover:text-red-700 transition text-left cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-gray-800 hover:text-yellow-600 cursor-pointer transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
