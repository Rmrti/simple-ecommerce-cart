import React from 'react';

const Product = ({ product, onAddToCart }) => {

  return (
    <div className="product-card">
      <img src={`${process.env.PUBLIC_URL}/images/${product.name.toLowerCase()}.jpg`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button className='button' onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;
