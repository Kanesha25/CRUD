import React from 'react';

const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <ul>
      {products.map(product => (
        <li key={product._id}>
          {product.name}: ${product.price} - {product.description}
          <button onClick={() => onDelete(product._id)}>Delete</button>
          <button onClick={() => onEdit(product)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
