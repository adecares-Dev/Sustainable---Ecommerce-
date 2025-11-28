import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Leaf, 
  ShoppingBag,
  ArrowRight 
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import SustainabilityBadge from '../components/common/SustainabilityBadge';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    getCartItemsCount,
    getSustainabilityImpact 
  } = useCart();
  const navigate = useNavigate();

  const impact = getSustainabilityImpact();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Discover sustainable products that align with your values
        </p>
        <Link
          to="/products"
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <div className="text-gray-600">
          {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Cart Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear Cart</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item._id} className="p-6">
                  <div className="flex space-x-4">
                    <img
                      src={item.images[0]?.url || '/api/placeholder/100/100'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            to={`/product/${item._id}`}
                            className="text-lg font-semibold text-gray-800 hover:text-green-600"
                          >
                            {item.name}
                          </Link>
                          <div className="flex items-center space-x-2 mt-1">
                            <SustainabilityBadge 
                              score={item.sustainabilityMetrics.packagingScore} 
                              showLabel={false}
                            />
                            <span className="text-sm text-gray-500">
                              by {item.supplier.name}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${item.price} each
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Sustainability Impact */}
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Your Impact</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Carbon Reduced:</span>
                <span className="font-semibold text-green-600">
                  {impact.carbonReduced?.toFixed(2) || 0} kg CO₂
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Water Saved:</span>
                <span className="font-semibold text-blue-600">
                  {impact.waterSaved?.toFixed(2) || 0} L
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Energy Saved:</span>
                <span className="font-semibold text-yellow-600">
                  {impact.energySaved?.toFixed(2) || 0} kWh
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">
                  ${(getCartTotal() * 0.08).toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-green-600">
                  ${(getCartTotal() * 1.08).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <div className="mt-4 text-center">
              <Link
                to="/products"
                className="text-green-600 hover:text-green-700 text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
              <div>
                <div className="font-semibold mb-1">Secure Payment</div>
                <div>256-bit SSL</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Carbon Neutral</div>
                <div>Shipping</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Easy Returns</div>
                <div>30 Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;