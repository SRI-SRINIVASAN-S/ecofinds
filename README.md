# 🌱 EcoFinds - Sustainable Marketplace

EcoFinds is a modern, eco-friendly marketplace platform that promotes sustainable living by facilitating the buying and selling of second-hand items. Built with React and modern web technologies, it provides a seamless experience for users to discover great deals while contributing to environmental sustainability.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Pages Overview](#pages-overview)
- [Components](#components)
- [Context Management](#context-management)
- [Contributing](#contributing)

## 🌟 Overview

EcoFinds is designed to address the growing need for sustainable consumption by creating a platform where users can:

- **Buy** high-quality second-hand items at discounted prices
- **Sell** their unused items to give them a second life
- **Save money** while reducing environmental waste
- **Discover** unique items across various categories
- **Track** their environmental impact through savings calculations

The platform emphasizes user experience, security, and environmental consciousness, making it accessible to users of all technical backgrounds.

## ✨ Features

### 🔐 Authentication & User Management

- Secure user registration and login
- Profile management with email validation
- User dashboard with activity tracking
- Purchase history and savings calculation

### 🛍️ Product Management

- Add products with multiple image uploads
- Category-based product organization
- Advanced search and filtering
- Product condition tracking
- Stock management

### 🛒 Shopping Experience

- Shopping cart with real-time updates
- Item count display in navigation
- Secure checkout process
- Purchase history tracking
- Savings calculation

### 🎨 User Interface

- Responsive design for all devices
- Modern, clean interface
- Intuitive navigation
- Loading states and error handling
- Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.1.0** - Modern JavaScript library for building user interfaces
- **React Router DOM 6.30.1** - Client-side routing for single-page applications

### Styling & UI

- **Tailwind CSS 3.4.17** - Utility-first CSS framework for rapid UI development
- **Headless UI 2.2.7** - Unstyled, accessible UI components
- **PostCSS 8.5.6** - CSS post-processor for enhanced styling capabilities

### Development Tools

- **Vite 6.3.5** - Fast build tool and development server
- **ESLint 9.25.0** - Code linting and quality assurance
- **Autoprefixer 10.4.21** - Automatic vendor prefixing for CSS

### Additional Libraries

- **React Hot Toast 2.6.0** - Beautiful toast notifications
- **React Hooks** - State management and side effects

## 📁 Project Structure

```
ecofinds/
├── public/                     # Static assets
│   └── vite.svg               # Vite logo
├── src/                       # Source code
│   ├── components/            # Reusable UI components
│   │   ├── Auth/             # Authentication components
│   │   ├── Layout/           # Layout components
│   │   │   ├── Footer.jsx    # Site footer
│   │   │   └── Navbar.jsx    # Navigation bar with cart
│   │   ├── Products/         # Product-related components
│   │   │   └── ProductCard.jsx # Product display card
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   ├── context/              # React Context for state management
│   │   ├── AuthContext.jsx   # User authentication state
│   │   ├── CartContext.jsx   # Shopping cart state
│   │   └── ProductContext.jsx # Product data management
│   ├── pages/                # Application pages
│   │   ├── AddProduct.jsx    # Add new product form
│   │   ├── Cart.jsx          # Shopping cart page
│   │   ├── Dashboard.jsx     # User dashboard
│   │   ├── Home.jsx          # Homepage with product listings
│   │   ├── Login.jsx         # User login page
│   │   ├── MyListings.jsx    # User's product listings
│   │   ├── PreviousPurchases.jsx # Purchase history
│   │   ├── ProductDetailPage.jsx # Individual product view
│   │   └── Signup.jsx        # User registration page
│   ├── utils/                # Utility functions
│   │   └── dummyData.js      # Mock data and API simulation
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
├── postcss.config.js         # PostCSS configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ecofinds
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🔄 How It Works

### Application Flow

```
User Registration/Login
        ↓
    Dashboard (Profile Management)
        ↓
    Browse Products (Home Page)
        ↓
    Add to Cart → Cart Management
        ↓
    Checkout → Purchase History
        ↓
    Add New Products (Sell Items)
```

### 1. User Registration & Authentication

- Users can create accounts with email validation
- Secure login system with local storage persistence
- Profile management with required email validation

### 2. Product Management

- **Adding Products**: Users can list items with multiple images, descriptions, and pricing
- **Product Discovery**: Advanced search and category filtering
- **Image Handling**: Automatic fallback for missing images with placeholder

### 3. Shopping Experience

- **Cart Management**: Add/remove items with real-time count updates
- **Checkout Process**: Secure transaction simulation
- **Purchase Tracking**: Complete history with savings calculations

### 4. Data Management

- **Local Storage**: Persistent data across browser sessions
- **Context API**: Centralized state management
- **Mock API**: Simulated backend with realistic data

### Component Architecture

```
App.jsx
├── AuthProvider (User State)
├── ProductProvider (Product Data)
├── CartProvider (Shopping Cart)
└── Router
    ├── Public Routes (Home, Login, Signup)
    └── Protected Routes (Dashboard, Cart, Add Product)
```

## 📄 Pages Overview

### 🏠 Home Page (`/`)

- **Purpose**: Main landing page with product discovery
- **Features**:
  - Hero section with search functionality
  - Category filtering
  - Product grid with responsive design
  - Load more pagination

### 🔐 Authentication Pages

- **Login** (`/login`): User authentication
- **Signup** (`/signup`): New user registration

### 👤 User Dashboard (`/dashboard`)

- **Purpose**: User profile and activity overview
- **Features**:
  - Profile information with email validation
  - Quick stats (purchases, savings)
  - Recent activity feed
  - Quick action buttons

### 🛍️ Product Management

- **Add Product** (`/add-product`): Create new listings
- **My Listings** (`/my-listings`): Manage user's products
- **Product Detail** (`/product/:id`): Individual product view

### 🛒 Shopping

- **Cart** (`/cart`): Shopping cart management
- **Previous Purchases** (`/purchases`): Order history

## 🧩 Components

### Layout Components

- **Navbar**: Navigation with cart icon and user menu
- **Footer**: Site footer with links and information

### Product Components

- **ProductCard**: Displays product information with:
  - Image with fallback handling
  - Price with discount calculation
  - Rating display
  - Add to cart functionality

### Utility Components

- **ProtectedRoute**: Ensures authentication for protected pages

## 🗃️ Context Management

### AuthContext

- User authentication state
- Login/logout functionality
- Profile management
- Local storage persistence

### ProductContext

- Product data management
- Search and filtering
- Local product storage
- API simulation

### CartContext

- Shopping cart state
- Add/remove items
- Quantity management
- Purchase history

## 🎯 Key Features Explained

### Image Handling

- **Automatic Fallback**: Missing images show placeholder
- **Multiple Uploads**: Support for up to 5 product images
- **Responsive Display**: Images adapt to different screen sizes

### Cart Functionality

- **Real-time Updates**: Item count updates immediately
- **Persistent Storage**: Cart persists across browser sessions
- **Visual Feedback**: Toast notifications for user actions

### Email Validation

- **Required Field**: Email is mandatory for account security
- **Format Validation**: Proper email format checking
- **User Feedback**: Clear error messages and warnings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Vite for the fast development experience
- All contributors and users of EcoFinds

---

**EcoFinds** - Making sustainable living accessible to everyone! 🌱♻️
