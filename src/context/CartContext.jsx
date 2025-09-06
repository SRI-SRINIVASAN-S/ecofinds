import React, { createContext, useContext, useReducer, useEffect } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/dummyData";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    case "CHECKOUT":
      const newPurchase = {
        id: Date.now(),
        items: state.items,
        total: state.total,
        date: new Date().toISOString(),
        status: "completed",
      };
      return {
        ...state,
        items: [],
        purchases: [...state.purchases, newPurchase],
      };
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload.items || [],
        purchases: action.payload.purchases || [],
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  purchases: [],
  get total() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },
  get itemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = getFromLocalStorage("ecofinds_cart", {
      items: [],
      purchases: [],
    });
    dispatch({ type: "LOAD_CART", payload: savedCart });
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("ecofinds_cart", {
      items: state.items,
      purchases: state.purchases,
    });
  }, [state.items, state.purchases]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const checkout = () => {
    if (state.items.length === 0) {
      return { success: false, error: "Cart is empty" };
    }

    dispatch({ type: "CHECKOUT" });
    return { success: true, message: "Order placed successfully!" };
  };

  const getPurchaseById = (purchaseId) => {
    return state.purchases.find((purchase) => purchase.id === purchaseId);
  };

  const getTotalSavings = () => {
    // Calculate savings based on original prices vs current prices
    // This is a mock calculation - in real app, you'd compare with original retail prices
    return state.purchases.reduce((total, purchase) => {
      return (
        total +
        purchase.items.reduce((purchaseTotal, item) => {
          // Assume 30% savings on second-hand items
          const originalPrice = item.price / 0.7;
          return purchaseTotal + (originalPrice - item.price) * item.quantity;
        }, 0)
      );
    }, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    getPurchaseById,
    getTotalSavings,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
