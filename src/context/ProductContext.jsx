import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/dummyData";

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false };
    case "APPEND_PRODUCTS":
      console.log(
        "Appending products, current count:",
        state.products.length,
        "new products:",
        action.payload.length
      );
      return {
        ...state,
        products: [...state.products, ...action.payload],
        loading: false,
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_PAGINATION":
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        localProducts: [action.payload, ...state.localProducts],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        localProducts: state.localProducts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        localProducts: state.localProducts.filter(
          (p) => p.id !== action.payload
        ),
      };
    case "SET_LOCAL_PRODUCTS":
      return { ...state, localProducts: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState = {
  products: [],
  localProducts: [], // Store locally added products separately
  categories: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "all",
  pagination: {
    skip: 0,
    limit: 20,
    total: 0,
  },
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Load categories and local products on mount
  useEffect(() => {
    loadCategories();
    loadLocalProducts();
  }, []);

  const loadLocalProducts = () => {
    const savedProducts = getFromLocalStorage("ecofinds_local_products", []);
    dispatch({ type: "SET_LOCAL_PRODUCTS", payload: savedProducts });
  };

  const loadCategories = async () => {
    try {
      const categories = await fetchCategories();
      dispatch({ type: "SET_CATEGORIES", payload: categories });
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadProducts = async (
    searchQuery = "",
    category = "all",
    skip = 0,
    append = false
  ) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const data = await fetchProducts(20, skip, searchQuery, category);

      // Use APPEND_PRODUCTS if loading more, SET_PRODUCTS if starting fresh
      if (append) {
        dispatch({ type: "APPEND_PRODUCTS", payload: data.products });
      } else {
        dispatch({ type: "SET_PRODUCTS", payload: data.products });
      }

      dispatch({
        type: "SET_PAGINATION",
        payload: {
          skip: data.skip,
          limit: data.limit,
          total: data.total,
        },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const searchProducts = (query) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
    loadProducts(query, state.selectedCategory, 0);
  };

  const filterByCategory = (category) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
    loadProducts(state.searchQuery, category, 0);
  };

  const loadMoreProducts = () => {
    const nextSkip = state.pagination.skip + state.pagination.limit;
    if (nextSkip < state.pagination.total) {
      console.log(
        "Loading more products, current count:",
        state.products.length,
        "next skip:",
        nextSkip
      );
      loadProducts(state.searchQuery, state.selectedCategory, nextSkip, true);
    }
  };

  const getProductById = async (id) => {
    try {
      // First check local products
      const localProduct = state.localProducts.find(
        (p) => p.id === parseInt(id)
      );
      if (localProduct) {
        return localProduct;
      }

      // If not found locally, fetch from API
      const product = await fetchProductById(id);
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  const addProduct = (productData, userId = 1) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    // Save to localStorage
    const updatedLocalProducts = [newProduct, ...state.localProducts];
    saveToLocalStorage("ecofinds_local_products", updatedLocalProducts);

    return newProduct;
  };

  const updateProduct = (productId, updates) => {
    const existingProduct = state.localProducts.find((p) => p.id === productId);
    if (!existingProduct) return null;

    const updatedProduct = {
      ...existingProduct,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });

    // Update localStorage
    const updatedLocalProducts = state.localProducts.map((p) =>
      p.id === productId ? updatedProduct : p
    );
    saveToLocalStorage("ecofinds_local_products", updatedLocalProducts);

    return updatedProduct;
  };

  const deleteProduct = (productId) => {
    dispatch({ type: "DELETE_PRODUCT", payload: productId });

    // Update localStorage
    const updatedLocalProducts = state.localProducts.filter(
      (p) => p.id !== productId
    );
    saveToLocalStorage("ecofinds_local_products", updatedLocalProducts);
  };

  const getUserProducts = (userId) => {
    return state.localProducts.filter((p) => p.userId === userId);
  };

  const getAllProducts = () => {
    // Combine API products with local products, local products first
    return [...state.localProducts, ...state.products];
  };

  const value = {
    ...state,
    loadProducts,
    searchProducts,
    filterByCategory,
    loadMoreProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getUserProducts,
    getAllProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
