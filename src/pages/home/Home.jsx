import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  return (
    <div className="bg-white text-gray-900 font-poppins">
      <Navbar />

      {/* Hero Section */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center relative px-4"
        style={{ backgroundImage: "url('/assets/featured-bg.jpeg')" }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-white/20"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto p-10 rounded-xl shadow-2xl bg-white/80 backdrop-blur-md">
          <p className="uppercase tracking-widest text-sm text-yellow-600 mb-2">
            New Collection 2025
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Elevate Your Lifestyle
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-700">
            Experience the perfect blend of craftsmanship, elegance, and innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/product-list"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold uppercase transition-transform transform hover:scale-105"
            >
              Explore Our Collection
            </Link>
            <Link
              to="/#newsletter"
              className="border border-yellow-400 hover:bg-yellow-100 text-yellow-700 px-6 py-3 rounded-lg font-medium uppercase transition"
            >
              Join the Club
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="flex justify-center flex-wrap gap-4 mt-8 text-sm text-gray-700">
            <span className="px-4 py-2 bg-yellow-100 rounded-full">Free Shipping</span>
            <span className="px-4 py-2 bg-yellow-100 rounded-full">30-Day Return</span>
            <span className="px-4 py-2 bg-yellow-100 rounded-full">Handcrafted Luxury</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 text-center">
        <div className="bg-white/80 backdrop-blur-sm py-12 px-4 rounded-xl mx-4">
          <h2 className="text-3xl font-semibold mb-10">Discover Excellence</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                img: "https://zealande.com/cdn/shop/articles/1689684177_Masque_Everything_to_luxury_0965d66e-de02-4bf5-a5bf-7ee5d3c883a3.webp?v=1742469526",
                text: "Timeless Elegance",
              },
              {
                img: "https://hips.hearstapps.com/hmg-prod/images/bella-emar-is-seen-wearing-my-essential-wardrobe-vest-na-kd-news-photo-1721744803.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=1120:*",
                text: "Premium Craftsmanship",
              },
              {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIcquvJb2WkvPqNRsnX_uzABlRzBm1WAEfPw&s",
                text: "Next-Gen Innovation",
              },
            ].map(({ img, text }, i) => (
              <div
                key={i}
                className="w-72 bg-white p-4 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={img}
                  alt={text}
                  className="rounded-lg object-cover h-60 w-full"
                />
                <p className="mt-4 font-semibold text-gray-800">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-14">
        <h2 className="text-2xl font-bold text-center mb-6">
          What Our Customers Say
        </h2>
        <div className="max-w-4xl mx-auto space-y-6 px-4">
          <div className="italic text-center">
            <p>
              "LuxuryX redefines elegance. Their watches are truly a masterpiece!"
            </p>
            <span className="block mt-2 font-semibold">- Sarah J.</span>
          </div>
          <div className="italic text-center">
            <p>
              "The craftsmanship in every product is simply unmatched. A true luxury experience."
            </p>
            <span className="block mt-2 font-semibold">- Mark T.</span>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Trusted By The Best</h2>
        <div className="flex justify-center gap-10 flex-wrap px-6">
          <img
            src="https://brandeps.com/logo-download/H/H-&-M-logo-01.png"
            alt="H&M"
            className="h-20 object-contain hover:cursor-pointer hover:scale-110"
          />
          <img
            src="https://brandeps.com/logo-download/L/Levis-logo-vector-01.svg"
            alt="Levis"
            className="h-20 object-contain hover:cursor-pointer hover:scale-110"
          />
          <img
            src="https://brandeps.com/logo-download/P/Polo-Ralph-Lauren-logo-vector-01.svg"
            alt="Polo Ralph Lauren"
            className="h-20 object-contain hover:cursor-pointer hover:scale-110"
          />
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="bg-yellow-50 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Exclusive Club</h2>
        <p className="mb-6">
          Subscribe and get early access to limited edition products.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg border border-gray-300 w-full max-w-md"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-6 text-gray-700">
        <p>&copy; 2025 LuxuryX. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
