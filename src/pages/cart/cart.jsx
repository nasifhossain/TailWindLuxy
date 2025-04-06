import { useContext, useEffect, useState } from "react";
import { ShopingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

function Cart() {
  const navigate = useNavigate();
  const { indexItems, setIndexItems, deleteItem, updateCart } =
    useContext(ShopingCartContext);
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setLoading(true);
      axios
        .get("https://luxury-x.vercel.app/cart", {
          params: { username },
        })
        .then((result) => {
          setLoading(false);
          setIndexItems(result.data.cart.items);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      const carty = localStorage.getItem("cart");
      if (carty) {
        const cartDetials = JSON.parse(carty);
        setIndexItems(cartDetials);
      }
    }
  }, []);

  const totalPrice = indexItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const increaseQuantity = async (id) => {
    try {
      const newItems = indexItems.map((item) =>
        item.idx === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setIndexItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));

      if (localStorage.getItem("username")) await updateCart(1, id);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const newItems = indexItems
        .map((item) =>
          item.idx === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      setIndexItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));

      if (localStorage.getItem("username")) await updateCart(-1, id);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginMessage("You need to log in before proceeding to checkout.");
    } else {
      console.log("Proceeding to checkout...");
    }
  };

  if (loading) {
    return (
      <h2 className="text-xl font-semibold text-center text-gray-600">
        Loading Cart...
      </h2>
    );
  }

  return (
    <div>
        <Navbar/>
      <div className="w-full mb-5  mx-auto bg-white text-gray-800 px-10 rounded-lg shadow-lg">
        <header className="text-center border-b-2 border-gray-300 pb-4 mb-6">
          <h2 className="text-3xl font-bold text-yellow-500 mt-10">
            🛒 Your Shopping Cart
          </h2>
        </header>

        {indexItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">Your cart is empty.</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
              onClick={() => navigate("/product-list")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {indexItems.map((item) => (
                <div
                  key={item.idx}
                  className="flex items-center gap-4 bg-gray-100 p-4 rounded border border-gray-300"
                >
                  <img
                    onClick={() => navigate(`/product-details/${item.idx}`)}
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <strong className="text-lg  w-full text-gray-900 flex justify-center ">
                      {item.title}
                    </strong>
                    <p className="text-sm flex justify-center text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => deleteItem(item.idx)}
                      className="mt-2 hover:cursor-pointer text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.idx)}
                      className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => increaseQuantity(item.idx)}
                      className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className=" lg:w-1/3 bg-gray-100 border border-gray-300 p-6 rounded space-y-4">
              <h3 className="text-xl font-bold text-yellow-500 text-center">
                Cart Summary
              </h3>

              {indexItems.map((item) => (
                <div
                  key={item.idx}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>{item.title}</span>
                  <span>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </span>
                </div>
              ))}

              <hr />
              <h3 className="text-lg font-bold text-center text-yellow-500">
                Total: ${totalPrice.toFixed(2)}
              </h3>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded hover:cursor-pointer"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/product-list")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded hover:cursor-pointer"
              >
                Continue Shopping
              </button>

              {loginMessage && (
                <p className="text-sm text-center text-red-500">
                  {loginMessage}{" "}
                  <a href="/login" className="text-blue-600 underline">
                    Login here
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
