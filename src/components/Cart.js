import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, onRemoveFromCart, onAdjustQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemoveFromCart={onRemoveFromCart}
              onAdjustQuantity={onAdjustQuantity}
            />
          ))}
          <div className="cart-total">
            <h3>Total: ${total}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
