import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => {
        console.log("❌ Error aaya hai:", error);
      });
  }, []);

  return (
    <div className="max-w-full px-4 py-8 ">
      <h2 className="text-2xl font-bold mb-6 text-center">Products List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  ">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-gray-300 p-4 rounded-xl "
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-33 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-1">Brand: {product.brand}</p>
            <p className="text-sm text-gray-600 mb-1">Category: {product.category}</p>
            <p className="text-sm text-yellow-600 mb-1">⭐ Rating: {product.rating}</p>
            <p className="text-sm text-green-600 mb-1">In Stock: {product.stock}</p>
            <p className="text-lg font-bold text-blue-600 mb-2">💵 ${product.price}</p>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
