import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        if (productData) {
          console.log("Product data:", productData);
          setProduct(productData);
        } else {
          toast.error("Product not found");
          navigate("/");
        }
      } catch (error) {
        toast.error("Error loading product");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById, navigate]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getDiscountPercentage = (product) => {
    // Use the product's discountPercentage if available, otherwise calculate from price
    if (product.discountPercentage) {
      return product.discountPercentage;
    }
    const originalPrice = product.price / 0.7;
    return Math.round(((originalPrice - product.price) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.thumbnail];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={images[selectedImage] || "/placeholder-image.jpg"}
              alt={product.title}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x400?text=No+Image";
              }}
            />
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-16 aspect-h-12 rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-primary-500" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150x100?text=No+Image";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {String(product.title || "")}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 4.5)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating?.toFixed(1) || "4.5"} (
                  {Array.isArray(product.reviews)
                    ? product.reviews.length
                    : product.reviews || 0}{" "}
                  reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {String(product.category || "")}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xl text-gray-500 line-through">
                {formatPrice(product.price / 0.7)}
              </span>
              <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
                Save {getDiscountPercentage(product)}%
              </span>
            </div>
            <p className="text-green-600 font-medium">
              You save {formatPrice(product.price / 0.7 - product.price)} on
              this item!
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {String(product.description || "")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-900">Brand:</span>
              <span className="ml-2 text-gray-600">
                {String(product.brand || "Unknown")}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Stock:</span>
              <span className="ml-2 text-gray-600">
                {String(product.stock || "In Stock")}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Condition:</span>
              <span className="ml-2 text-gray-600">Good</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Seller:</span>
              <span className="ml-2 text-gray-600">EcoFinds User</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-900"
              >
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Add to Cart
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium">
                Buy Now
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Why buy second-hand?
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Save money while getting quality items</li>
              <li>• Reduce environmental impact</li>
              <li>• Give items a second life</li>
              <li>• Support sustainable consumption</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
