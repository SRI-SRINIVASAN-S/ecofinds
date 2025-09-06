import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/Products/ProductCard";

const Home = () => {
  const {
    products,
    categories,
    loading,
    error,
    searchQuery,
    selectedCategory,
    loadProducts,
    searchProducts,
    filterByCategory,
    loadMoreProducts,
    pagination,
    getAllProducts,
  } = useProducts();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  // Get all products (API + local) and apply filters
  const allProducts = getAllProducts();
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category?.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(searchInput);
  };

  const handleCategoryChange = (category) => {
    filterByCategory(category);
  };

  const handleLoadMore = () => {
    loadMoreProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to EcoFinds
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing second-hand items while helping the environment
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Categories
          </button>
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => {
              const categoryName =
                typeof category === "string"
                  ? category
                  : category.name || category;
              const categoryKey =
                typeof category === "string"
                  ? category
                  : category.slug || category.name || index;

              return (
                <button
                  key={categoryKey}
                  onClick={() => handleCategoryChange(categoryName)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === categoryName
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {typeof categoryName === "string"
                    ? categoryName.charAt(0).toUpperCase() +
                      categoryName.slice(1)
                    : String(categoryName)}
                </button>
              );
            })}
        </div>
      </div>

      {/* Search Results Info */}
      {(searchQuery || selectedCategory !== "all") && (
        <div className="mb-6">
          <p className="text-gray-600">
            {searchQuery && (
              <span>
                Search results for "
                <span className="font-semibold">{searchQuery}</span>"
              </span>
            )}
            {searchQuery && selectedCategory !== "all" && " in "}
            {selectedCategory !== "all" && (
              <span className="font-semibold">
                {typeof selectedCategory === "string"
                  ? selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  : String(selectedCategory)}
              </span>
            )}{" "}
            ({filteredProducts.length} items found)
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && allProducts.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading products
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          {pagination.skip + pagination.limit < pagination.total && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  "Load More Products"
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            {searchQuery || selectedCategory !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Be the first to add a product to the marketplace!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
