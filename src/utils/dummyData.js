// Dummy data for the EcoFinds marketplace
export const categories = [
  { id: 1, name: "Electronics", icon: "📱" },
  { id: 2, name: "Fashion", icon: "👕" },
  { id: 3, name: "Books", icon: "📚" },
  { id: 4, name: "Home & Garden", icon: "🏠" },
  { id: 5, name: "Sports", icon: "⚽" },
  { id: 6, name: "Toys", icon: "🧸" },
  { id: 7, name: "Automotive", icon: "🚗" },
  { id: 8, name: "Beauty", icon: "💄" },
];

export const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate about sustainable living and finding great deals!",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, CA",
    bio: "Love buying and selling second-hand items to reduce waste.",
  },
];

// API configuration for DummyJSON
export const API_BASE_URL = "https://dummyjson.com";

export const fetchProducts = async (
  limit = 20,
  skip = 0,
  search = "",
  category = ""
) => {
  try {
    let url = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(
        search
      )}&limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    // Filter by category if specified
    if (category && category !== "all") {
      data.products = data.products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0, skip: 0, limit: 0 };
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();
    console.log("Fetched categories:", categories);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return fallback categories if API fails
    return [
      "smartphones",
      "laptops",
      "fragrances",
      "skincare",
      "groceries",
      "home-decoration",
      "furniture",
      "tops",
      "womens-dresses",
      "womens-shoes",
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "womens-watches",
      "womens-bags",
      "womens-jewellery",
      "sunglasses",
      "automotive",
      "motorcycle",
      "lighting",
    ];
  }
};

// Local storage helpers
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
};
