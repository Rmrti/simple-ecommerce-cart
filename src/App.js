import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import products from './data/products';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState('name'); // Default sort by name

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const adjustQuantity = (product, amount) => {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0; // No sorting
  });

  return (
    <div className="app-container">
      <Header />
      <div className="sort-options">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      <ProductList products={sortedProducts} onAddToCart={addToCart} />
      <Cart cartItems={cart} onRemoveFromCart={removeFromCart} onAdjustQuantity={adjustQuantity} />
      <Footer />
    </div>
  );
};

export default App;
