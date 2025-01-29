// Importing necessary dependencies from React
import React, { useState, useEffect } from 'react';

// Importing components used in the application
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';

// Importing the product data
import products from './data/products';

// Importing the CSS file for styling
import './App.css';

// Main App component
const App = () => {
  // State for managing the cart, initially an empty array
  const [cart, setCart] = useState([]);

  // State for managing the sorting option, default is "name"
  const [sortBy, setSortBy] = useState('name');

  /**
   * Function to add a product to the cart
   * If the product exists, it increases its quantity; otherwise, it adds a new product
   */
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      // If product exists in the cart, update its quantity
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If product does not exist, add it with an initial quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  /**
   * Function to remove a product from the cart
   * It filters out the product based on its id
   */
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  /**
   * Function to adjust the quantity of a product in the cart
   * It ensures that the quantity does not go below 1
   */
  const adjustQuantity = (product, amount) => {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  /**
   * useEffect Hook - Runs once when the component mounts
   * It loads the cart data from localStorage (if available)
   */
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  /**
   * Function to handle sorting option change
   * Updates the `sortBy` state when the user selects a sorting option
   */
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  /**
   * Sorting logic - Creates a new sorted array based on the selected sorting option
   * If "name" is selected, it sorts alphabetically
   * If "price" is selected, it sorts numerically
   */
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0; // Default case (no sorting)
  });

  return (
    <div className="app-container">
      {/* Header component */}
      <Header />

      {/* Sorting dropdown menu */}
      <div className="sort-options">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Product list component - Displays sorted products and allows adding to cart */}
      <ProductList products={sortedProducts} onAddToCart={addToCart} />

      {/* Cart component - Displays cart items and allows modifications */}
      <Cart cartItems={cart} onRemoveFromCart={removeFromCart} onAdjustQuantity={adjustQuantity} />

      {/* Footer component */}
      <Footer />
    </div>
  );
};

// Exporting the App component so it can be used in index.js
export default App;
