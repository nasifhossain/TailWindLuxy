import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopingCartContext } from "../../context";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

function ProductDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [randomIDs, setRandomIDs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopingCartContext);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setError("");
        setData(res.data);
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to fetch data.");
      });
  }, [id]);

  useEffect(() => {
    function getRandomNumbers(count, min, max, exclude) {
      const numbers = new Set();
      while (numbers.size < count) {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        if (rand !== exclude) numbers.add(rand);
      }
      return [...numbers];
    }
    const generatedIDs = getRandomNumbers(4, 1, 30, parseInt(id));
    setRandomIDs(generatedIDs);
  }, [id]);

  useEffect(() => {
    async function fetchRecommendations() {
      if (randomIDs.length === 4) {
        const promises = randomIDs.map((rid) =>
          fetch(`https://dummyjson.com/products/${rid}`).then((res) => res.json())
        );
        const results = await Promise.all(promises);
        setRecommendations(results);
      }
    }
    fetchRecommendations();
  }, [randomIDs]);

  if (loading) return <h3 className="text-center text-yellow-500 text-xl">Loading Product...</h3>;
  if (error) return <h3 className="text-center text-red-500 text-xl">Error: {error}</h3>;

  function handleClick(productId) {
    navigate(`/product-details/${productId}`);
  }

  return (
    <div className="font-poppins text-gray-800 bg-white">
        <Navbar/>
      <button
        className="flex items-center gap-2 text-yellow-600 font-semibold p-3 rounded hover:bg-yellow-100"
        onClick={() => navigate(-1)}
      >
        <span className="text-2xl">&#8592;</span> Back
      </button>

      <div className="flex flex-col sm:flex-row gap-8 p-6 max-w-6xl mx-auto">
        {/* Image Gallery */}
        <div className="flex-1 text-center">
          <img
            src={selectedImage || data?.images?.[0]}
            alt={data?.title}
            className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
          />
          <div className="flex justify-center gap-3 mt-4">
            {data?.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Thumbnail"
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                  selectedImage === img ? "border-yellow-500" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-bold text-yellow-600 mb-2">{data?.title}</h3>
          <p className="text-lg text-red-500 font-semibold mb-4">Price: ${data?.price}</p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded font-semibold mb-6 hover:cursor-pointer"
            onClick={() => addToCart(data)}
          >
            Add to Cart
          </button>

          <div>
            <h4 className="text-lg font-semibold mb-2">Details</h4>
            <ul className="space-y-1">
              {data?.warrantyInformation && (
                <li><strong>Warranty:</strong> {data?.warrantyInformation}</li>
              )}
              {data?.dimensions && (
                <>
                  <li><strong>Width:</strong> {data?.dimensions?.width}</li>
                  <li><strong>Height:</strong> {data?.dimensions?.height}</li>
                  <li><strong>Depth:</strong> {data?.dimensions?.depth}</li>
                </>
              )}
              {data?.weight && (
                <li><strong>Weight:</strong> {data?.weight}</li>
              )}
            </ul>
            {data?.returnPolicy && (
              <p className="mt-4 text-sm text-gray-600 italic">{data?.returnPolicy}</p>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="w-full justify-center mx-auto px-6 mt-10">
        <h3 className="text-xl font-bold text-center text-yellow-600 mb-4">Recommended Products</h3>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 justify-center w-full gap-4 overflow-x-auto p-2">
          {recommendations.length > 0 ? (
            recommendations.map((product) => (
              <div
                key={product.id}
                onClick={() => handleClick(product.id)}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 min-w-[160px] text-center cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full bg-slate-300   object-cover rounded mb-2"
                />
                <p className="text-sm font-medium">{product.title}</p>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-500">Loading recommendations...</p>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">Customer Reviews</h2>
        {data?.reviews?.length ? (
          data.reviews.map((review, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
              <h4 className="text-lg font-semibold text-yellow-700">{review.reviewerName}</h4>
              <p className="text-sm text-red-500">⭐ {review.rating}/5</p>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;