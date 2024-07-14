import React, { useState, useEffect } from 'react';

const EditProduct = ({ currentProduct, onUpdate }) => {
  const [name, setName] = useState(currentProduct ? currentProduct.name : '');
  const [price, setPrice] = useState(currentProduct ? currentProduct.price : '');
  const [description, setDescription] = useState(currentProduct ? currentProduct.description : '');

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setPrice(currentProduct.price);
      setDescription(currentProduct.description);
    }
  }, [currentProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(currentProduct._id, { name, price, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name" 
        required 
      />
      <input 
        type="number" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Price" 
        required 
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
