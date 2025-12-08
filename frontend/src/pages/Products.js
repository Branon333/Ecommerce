import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../utils/api';

const Products = () => {
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  });

  const { data: products = [], isLoading, error } = useQuery(
    ['products', filters],
    async () => {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      
      const response = await api.get(`/products?${params.toString()}`);
      return response.data;
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading products</div>
      </div>
    );
  }

  const [addedIds, setAddedIds] = useState(new Set());

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const existing = JSON.parse(localStorage.getItem('cart') || '[]');
      const idx = existing.findIndex((p) => p._id === product._id);
      if (idx > -1) {
        existing[idx].qty += 1;
      } else {
        existing.push({ ...product, qty: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(existing));
      const newSet = new Set(addedIds);
      newSet.add(product._id);
      setAddedIds(newSet);
      setTimeout(() => {
        const s = new Set(newSet);
        s.delete(product._id);
        setAddedIds(s);
      }, 1500);
    } catch (err) {
      console.error('Add to cart error', err);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="home">Home & Garden</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
            ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-[1.02]"
              >
                <Link to={`/products/${product._id}`} className="block">
                  <div className="w-full bg-gray-200">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/products/${product._id}`} className="block">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  </Link>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <div className="flex flex-col items-end">
                      {product.stock > 0 ? (
                        <>
                          <span className="text-sm font-semibold text-green-600">In Stock</span>
                          <span className="text-xs text-gray-500">{product.stock} available</span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold text-red-600">Out of Stock</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition"
                    >
                      {addedIds.has(product._id) ? 'Added' : 'Add to cart'}
                    </button>
                    <Link to={`/products/${product._id}`} className="text-sm text-gray-600 hover:text-primary-600">View</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

