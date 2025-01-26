import React from 'react';

const CartItem = ({ item, onRemoveFromCart, onAdjustQuantity }) => {
  return (
    <div className="cart-item">
      <div className="item-details">
        <span>{item.name}</span>
        <div className="item-price-quantity">
          <span>${item.price}</span>
          <span> x {item.quantity}</span>
        </div>
      </div>
      <div className="item-actions">
        <button onClick={() => onAdjustQuantity(item, -1)}>-</button>
        <button onClick={() => onAdjustQuantity(item, 1)}>+</button>
        <button className="remove-button" onClick={() => onRemoveFromCart(item)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
