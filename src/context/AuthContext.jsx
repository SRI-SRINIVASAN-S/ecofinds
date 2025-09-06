import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  initialUsers,
} from "../utils/dummyData";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = getFromLocalStorage("ecofinds_user");
    if (savedUser) {
      dispatch({ type: "LOGIN", payload: savedUser });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING", payload: true });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user in dummy data
    const user = initialUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userData = { ...user };
      delete userData.password; // Don't store password

      saveToLocalStorage("ecofinds_user", userData);
      dispatch({ type: "LOGIN", payload: userData });
      return { success: true, user: userData };
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
      return { success: false, error: "Invalid email or password" };
    }
  };

  const signup = async (userData) => {
    dispatch({ type: "SET_LOADING", payload: true });

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = initialUsers.find((u) => u.email === userData.email);
    if (existingUser) {
      dispatch({ type: "SET_LOADING", payload: false });
      return { success: false, error: "User with this email already exists" };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      ...userData,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    };

    const userDataToStore = { ...newUser };
    delete userDataToStore.password; // Don't store password

    saveToLocalStorage("ecofinds_user", userDataToStore);
    dispatch({ type: "LOGIN", payload: userDataToStore });
    return { success: true, user: userDataToStore };
  };

  const logout = () => {
    localStorage.removeItem("ecofinds_user");
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...state.user, ...updates };
    saveToLocalStorage("ecofinds_user", updatedUser);
    dispatch({ type: "UPDATE_PROFILE", payload: updates });
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
