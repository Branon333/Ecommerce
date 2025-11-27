import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';

const Cart = () => {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery('cart', async () => {
    const response = await api.get('/cart');
    return response.data;
  });

  const updateQuantityMutation = useMutation(
    ({ itemId, quantity }) => api.put(`/cart/update/${itemId}`, { quantity }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      }
    }
  );

  const removeItemMutation = useMutation(
    (itemId) => api.delete(`/cart/remove/${itemId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      }
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading cart...</div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.items.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex items-center space-x-4">
                  {item.product?.images?.[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                    <p className="text-gray-600">${item.price} each</p>
                    {item.product?.stock !== undefined && (
                      <p className={`text-sm mt-1 ${
                        item.product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.product.stock > 0 
                          ? `${item.product.stock} in stock` 
                          : 'Out of stock'}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        onClick={() => updateQuantityMutation.mutate({
                          itemId: item._id,
                          quantity: item.quantity - 1
                        })}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantityMutation.mutate({
                          itemId: item._id,
                          quantity: item.quantity + 1
                        })}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItemMutation.mutate(item._id)}
                        className="ml-4 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.totalPrice?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${cart.totalPrice?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

