import React, { useEffect, useState } from 'react';

const ProductsWithCheckout = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => {
        console.log("❌ Error aaya hai:", error);
      });
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
    ));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    alert('✅ Order placed successfully!');
    setCart([]);
    setShowCheckout(false);
  };

  return (
    <div className="max-w-full px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {showCheckout ? ' Checkout Page' : ' Products List'}
      </h2>

      {!showCheckout ? (
        <>
          <div className="bg-white shadow-md p-4 rounded-lg mb-6 text-center border">
            <h3 className="text-lg font-semibold">🛒 Cart Summary</h3>
            <p>Total Items: <strong>{totalItems}</strong></p>
            <p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
            {cart.length > 0 && (
              <button
                onClick={() => setShowCheckout(true)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Proceed to Checkout 🧾
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-gray-100 p-4 rounded-xl shadow">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-1">Brand: {product.brand}</p>
                <p className="text-sm text-gray-600 mb-1">Category: {product.category}</p>
                <p className="text-sm text-yellow-600 mb-1">⭐ Rating: {product.rating}</p>
                <p className="text-sm text-green-600 mb-1">In Stock: {product.stock}</p>
                <p className="text-lg font-bold text-blue-600 mb-2">💵 ${product.price}</p>
                <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart 🛒
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">🧾 Checkout Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>${item.price} × {item.quantity} = ${item.price * item.quantity}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                >➖</button>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                >➕</button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p><strong>Total Items:</strong> {totalItems}</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setShowCheckout(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back to Products
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm Order 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsWithCheckout;
