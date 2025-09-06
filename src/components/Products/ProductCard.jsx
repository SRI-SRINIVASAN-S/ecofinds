import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getCategoryImage } from "../../utils/categoryImages";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, updateQuantity, items } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart!");
  };

  const handleQuantityChange = (e, action) => {
    e.preventDefault();
    e.stopPropagation();

    if (action === "increase") {
      addToCart(product);
      toast.success("Quantity increased!");
    } else if (action === "decrease") {
      const currentItem = items.find((item) => item.id === product.id);
      if (currentItem && currentItem.quantity > 1) {
        updateQuantity(product.id, currentItem.quantity - 1);
        toast.success("Quantity decreased!");
      } else {
        removeFromCart(product.id);
        toast.success("Removed from cart!");
      }
    }
  };

  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * discountPercentage) / 100;
  };

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage || 0
  );

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={
              product.thumbnail ||
              product.images?.[0] ||
              getCategoryImage(product.category, "300x200")
            }
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = getCategoryImage(product.category, "300x200");
            }}
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Category and Condition */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
              {product.condition || "Good"}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            {product.stock && (
              <span className="text-xs text-gray-500">
                {product.stock} left
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                (
                {(() => {
                  if (Array.isArray(product.reviews)) {
                    return product.reviews.length;
                  }
                  if (typeof product.reviews === "number") {
                    return product.reviews;
                  }
                  return 0;
                })()}
                )
              </span>
            </div>
          )}

          {/* Add to Cart Button / Quantity Controls */}
          {isInCart ? (
            <div className="flex items-center justify-center space-x-2 bg-green-50 border border-green-200 rounded-md p-2">
              <button
                onClick={(e) => handleQuantityChange(e, "decrease")}
                className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                -
              </button>
              <span className="text-lg font-semibold text-green-700 min-w-[2rem] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={(e) => handleQuantityChange(e, "increase")}
                className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
