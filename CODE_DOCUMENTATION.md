# 🌱 EcoFinds Marketplace - Code Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Core Components](#core-components)
5. [Pages & Routes](#pages--routes)
6. [Context API (State Management)](#context-api-state-management)
7. [Utilities & Helpers](#utilities--helpers)
8. [Styling & UI](#styling--ui)
9. [API Integration](#api-integration)
10. [How to Run](#how-to-run)

---

## 🎯 Project Overview

**EcoFinds** is a sustainable second-hand marketplace built with React. It allows users to buy and sell used items while promoting environmental consciousness. The app features user authentication, product management, shopping cart functionality, and purchase tracking.

### Key Features:

- 🔐 User Authentication (Login/Signup)
- 🛍️ Product Browsing & Search
- 🛒 Shopping Cart & Checkout
- 📦 Product Management (Add/Edit/Delete)
- 📊 Purchase History & Analytics
- 🌱 Environmental Impact Tracking

---

## 🛠️ Tech Stack

| Technology          | Purpose                 | Version     |
| ------------------- | ----------------------- | ----------- |
| **React**           | Frontend Framework      | 18.x        |
| **Vite**            | Build Tool & Dev Server | 6.x         |
| **React Router**    | Client-side Routing     | 6.x         |
| **TailwindCSS**     | Styling Framework       | 3.4.x       |
| **Context API**     | State Management        | Built-in    |
| **DummyJSON API**   | Product Data            | External    |
| **LocalStorage**    | Data Persistence        | Browser API |
| **React Hot Toast** | Notifications           | 2.x         |

---

## 📁 Folder Structure

```
ecofinds/
├── public/                     # Static assets
│   ├── vite.svg               # Vite logo
│   └── index.html             # HTML template
├── src/                       # Source code
│   ├── components/            # Reusable UI components
│   │   ├── Auth/             # Authentication components
│   │   ├── Layout/           # Layout components (Navbar, Footer)
│   │   ├── Products/         # Product-related components
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── context/              # State management (Context API)
│   ├── pages/                # Page components (Routes)
│   ├── utils/                # Helper functions & data
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
├── tailwind.config.js         # TailwindCSS configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies & scripts
```

---

## 🧩 Core Components

### 1. **Layout Components** (`src/components/Layout/`)

#### `Navbar.jsx`

**Purpose**: Main navigation bar with user menu and cart
**Key Features**:

- Logo and brand name
- Navigation links (Home, My Listings, Add Product)
- User authentication status
- Shopping cart icon with item count
- Responsive mobile menu
- User dropdown menu

```jsx
// Key functionality
const { user, isAuthenticated, logout } = useAuth();
const { itemCount } = useCart();
```

#### `Footer.jsx`

**Purpose**: Site footer with links and information
**Key Features**:

- Brand information
- Quick links
- Social media icons
- Support links
- Copyright information

### 2. **Authentication Components** (`src/components/Auth/`)

#### `Login.jsx` & `Signup.jsx`

**Purpose**: User authentication forms
**Key Features**:

- Form validation
- Error handling
- Demo credentials display
- Redirect after successful login
- Loading states

### 3. **Product Components** (`src/components/Products/`)

#### `ProductCard.jsx`

**Purpose**: Display product information in a card format
**Key Features**:

- Product image with fallback
- Title, description, and price
- Discount percentage display
- Rating stars
- Add to cart button
- Category badge

```jsx
// Key functionality
const handleAddToCart = (e) => {
  e.preventDefault();
  e.stopPropagation();
  addToCart(product);
  toast.success("Added to cart!");
};
```

### 4. **Route Protection**

#### `ProtectedRoute.jsx`

**Purpose**: Protect routes that require authentication
**Key Features**:

- Check authentication status
- Redirect to login if not authenticated
- Loading spinner during auth check

---

## 📄 Pages & Routes

### 1. **Home Page** (`src/pages/Home.jsx`)

**Route**: `/`
**Purpose**: Main product browsing page
**Key Features**:

- Product grid display
- Search functionality
- Category filtering
- Load more products
- Empty states
- Loading states

```jsx
// Key functionality
const { products, categories, loading, searchProducts, filterByCategory } =
  useProducts();
```

### 2. **Authentication Pages**

#### `Login.jsx` (`src/pages/Login.jsx`)

**Route**: `/login`
**Purpose**: User login form
**Key Features**:

- Email/password validation
- Demo credentials
- Remember me checkbox
- Forgot password link

#### `Signup.jsx` (`src/pages/Signup.jsx`)

**Route**: `/signup`
**Purpose**: User registration form
**Key Features**:

- Complete user profile form
- Password confirmation
- Terms agreement
- Form validation

### 3. **User Dashboard** (`src/pages/Dashboard.jsx`)

**Route**: `/dashboard` (Protected)
**Purpose**: User profile and statistics
**Key Features**:

- Profile information editing
- Quick stats (purchases, savings)
- Recent activity
- Quick action buttons

### 4. **Product Management**

#### `MyListings.jsx` (`src/pages/MyListings.jsx`)

**Route**: `/my-listings` (Protected)
**Purpose**: Manage user's product listings
**Key Features**:

- Product grid with CRUD operations
- Statistics cards
- Activate/deactivate products
- Delete products
- Empty state for new users

#### `AddProduct.jsx` (`src/pages/AddProduct.jsx`)

**Route**: `/add-product` (Protected)
**Purpose**: Create new product listings
**Key Features**:

- Comprehensive product form
- Image upload (multiple images)
- Category selection
- Form validation
- Preview functionality

### 5. **Product Details** (`src/pages/ProductDetailPage.jsx`)

**Route**: `/product/:id`
**Purpose**: Detailed product view
**Key Features**:

- Product image gallery
- Detailed information
- Price and discount display
- Quantity selector
- Add to cart functionality
- Environmental impact message

### 6. **Shopping & Purchases**

#### `Cart.jsx` (`src/pages/Cart.jsx`)

**Route**: `/cart` (Protected)
**Purpose**: Shopping cart management
**Key Features**:

- Cart items display
- Quantity updates
- Remove items
- Order summary
- Checkout process
- Empty cart state

#### `PreviousPurchases.jsx` (`src/pages/PreviousPurchases.jsx`)

**Route**: `/purchases` (Protected)
**Purpose**: Purchase history and analytics
**Key Features**:

- Purchase history list
- Order details
- Statistics cards
- Environmental impact tracking
- Savings calculation

---

## 🔄 Context API (State Management)

### 1. **AuthContext** (`src/context/AuthContext.jsx`)

**Purpose**: Manage user authentication state
**Key Features**:

- User login/logout
- User registration
- Profile updates
- Session persistence
- Loading states

```jsx
// Key state
const [state, dispatch] = useReducer(authReducer, {
  user: null,
  isAuthenticated: false,
  loading: true,
});

// Key functions
const login = async (email, password) => {
  /* ... */
};
const signup = async (userData) => {
  /* ... */
};
const logout = () => {
  /* ... */
};
const updateProfile = (updates) => {
  /* ... */
};
```

### 2. **ProductContext** (`src/context/ProductContext.jsx`)

**Purpose**: Manage product data and operations
**Key Features**:

- Product CRUD operations
- Search and filtering
- Category management
- Pagination
- API integration

```jsx
// Key state
const [state, dispatch] = useReducer(productReducer, {
  products: [],
  categories: [],
  loading: false,
  searchQuery: "",
  selectedCategory: "all",
  pagination: { skip: 0, limit: 20, total: 0 },
});

// Key functions
const loadProducts = async (searchQuery, category, skip) => {
  /* ... */
};
const searchProducts = (query) => {
  /* ... */
};
const addProduct = (productData) => {
  /* ... */
};
```

### 3. **CartContext** (`src/context/CartContext.jsx`)

**Purpose**: Manage shopping cart and purchases
**Key Features**:

- Add/remove items
- Quantity updates
- Checkout process
- Purchase history
- Local storage persistence

```jsx
// Key state
const [state, dispatch] = useReducer(cartReducer, {
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
});

// Key functions
const addToCart = (product) => {
  /* ... */
};
const checkout = () => {
  /* ... */
};
const getTotalSavings = () => {
  /* ... */
};
```

---

## 🛠️ Utilities & Helpers

### `src/utils/dummyData.js`

**Purpose**: API integration and data management
**Key Features**:

- DummyJSON API integration
- Product fetching functions
- Category management
- Local storage helpers
- Fallback data

```jsx
// Key functions
export const fetchProducts = async (limit, skip, search, category) => {
  /* ... */
};
export const fetchProductById = async (id) => {
  /* ... */
};
export const fetchCategories = async () => {
  /* ... */
};
export const saveToLocalStorage = (key, data) => {
  /* ... */
};
export const getFromLocalStorage = (key, defaultValue) => {
  /* ... */
};
```

**API Endpoints Used**:

- `GET /products` - Fetch products with pagination
- `GET /products/search` - Search products
- `GET /products/:id` - Get single product
- `GET /products/categories` - Get all categories

---

## 🎨 Styling & UI

### TailwindCSS Configuration (`tailwind.config.js`)

**Custom Color Scheme**:

```jsx
colors: {
  primary: {
    50: "#f0fdf4",   // Light green
    500: "#22c55e",  // Main green
    600: "#16a34a",  // Dark green
    // ... more shades
  },
  secondary: {
    50: "#f8fafc",   // Light gray
    900: "#0f172a",  // Dark gray
    // ... more shades
  }
}
```

### Global Styles (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}
```

### Design Principles:

- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Consistency**: Unified color scheme and spacing
- **User Experience**: Loading states, error handling, empty states

---

## 🔌 API Integration

### DummyJSON API

**Base URL**: `https://dummyjson.com`

**Product Data Structure**:

```json
{
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
  "images": ["url1", "url2", "url3"]
}
```

**Error Handling**:

- Network failures
- Invalid responses
- Fallback data
- User-friendly error messages

---

## 🚀 How to Run

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone/Navigate to project**:

   ```bash
   cd ecofinds
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open browser**:
   ```
   http://localhost:5173
   ```

### Available Scripts

```json
{
  "dev": "vite", // Start development server
  "build": "vite build", // Build for production
  "preview": "vite preview" // Preview production build
}
```

### Demo Credentials

```
Email: john@example.com
Password: password123
```

---

## 📚 Learning Resources

### For Beginners:

1. **React Basics**: Components, Props, State, Hooks
2. **React Router**: Navigation and routing
3. **Context API**: State management without Redux
4. **TailwindCSS**: Utility-first CSS framework
5. **JavaScript ES6+**: Modern JavaScript features

### Key Concepts Used:

- **Functional Components**: Modern React approach
- **Hooks**: useState, useEffect, useContext
- **Custom Hooks**: useAuth, useProducts, useCart
- **Context API**: Global state management
- **Local Storage**: Data persistence
- **API Integration**: Fetch API and error handling
- **Responsive Design**: Mobile-first approach

---

## 🔧 Common Issues & Solutions

### 1. **TailwindCSS Not Working**

- Ensure PostCSS is configured correctly
- Check if TailwindCSS is properly installed
- Verify content paths in `tailwind.config.js`

### 2. **API Errors**

- Check network connectivity
- Verify API endpoints are correct
- Check browser console for CORS issues

### 3. **Authentication Issues**

- Clear localStorage and try again
- Check if user data is properly stored
- Verify protected routes are working

### 4. **Build Errors**

- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors if using TypeScript
- Verify all imports are correct

---

## 🎯 Next Steps for Enhancement

### Potential Improvements:

1. **Backend Integration**: Replace localStorage with real API
2. **Image Upload**: Implement cloud storage (Cloudinary, AWS S3)
3. **Payment Integration**: Add Stripe or PayPal
4. **Real-time Features**: WebSocket for live updates
5. **Advanced Search**: Filters, sorting, pagination
6. **Mobile App**: React Native version
7. **Testing**: Unit tests, integration tests
8. **Performance**: Code splitting, lazy loading

### Code Quality:

- Add TypeScript for better type safety
- Implement proper error boundaries
- Add comprehensive testing
- Set up CI/CD pipeline
- Add code linting and formatting

---

This documentation provides a comprehensive overview of the EcoFinds marketplace codebase. Each section explains the purpose, functionality, and implementation details to help beginners understand how a modern React application is structured and built.

**Happy Coding! 🌱✨**
