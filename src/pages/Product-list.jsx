import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopingCartContext } from "../context";
import Navbar from "../components/Navbar/Navbar";

function ProductList() {
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopingCartContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    axios
      .get("https://dummyjson.com/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item, false);
    setCartMessage(`${item.title} added to cart!`);
    setTimeout(() => setCartMessage(null), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-xl text-blue-500 font-semibold animate-pulse">
          Loading Products...
        </h3>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <h3 className="text-xl text-red-500 font-semibold">Error: {error}</h3>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 flex flex-col">
      <div className="flex-1 flex-col">
        <Navbar />

        <div className="text-center mt-5  mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700">
            Product List
          </h1>
        </div>

        {cartMessage && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50 transition-all duration-300">
            {cartMessage}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 px-6 md:px-12 pb-12">
          {data?.products?.length > 0 ? (
            data.products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md px-4 pb-4 flex flex-col items-center justify-between hover:shadow-slate-500 transition-all duration-300"
              >
                <div className="bg-slate-300 h-85 flex flex-col justify-center items-center">
                  <img
                    onClick={() => navigate(`/product-details/${item.id}`)}
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-48 sm:h-45 object-cover rounded-md mb-3 cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <hr className="w-3/4 my-1 border-t border-gray-800" />



                <div className="text-lg max-sm:text-sm max-sm:font-bold font-medium text-center mb-1 w-full truncate">
                  {item.title}
                </div>
                <div className="text-blue-600 font-semibold mb-3">
                  ${item.price}
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-slate-100 hover:bg-yellow-500 font-bold px-4 py-2 rounded-3xl transition"
                >
                  Add To Cart
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
