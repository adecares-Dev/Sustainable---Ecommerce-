import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, Recycle, Sun, MapPin } from 'lucide-react';
import SustainabilityBadge from '../common/SustainabilityBadge';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const sustainabilityBadges = [];
  
  if (product.sustainabilityMetrics.isOrganic) {
    sustainabilityBadges.push({ label: 'Organic', color: 'green', icon: Leaf });
  }
  if (product.sustainabilityMetrics.isRecycled) {
    sustainabilityBadges.push({ label: 'Recycled', color: 'blue', icon: Recycle });
  }
  if (product.sustainabilityMetrics.isFairTrade) {
    sustainabilityBadges.push({ label: 'Fair Trade', color: 'yellow', icon: Sun });
  }
  if (product.sustainabilityMetrics.isLocal) {
    sustainabilityBadges.push({ label: 'Local', color: 'purple', icon: MapPin });
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative">
          <img 
            src={product.images[0]?.url || '/api/placeholder/300/200'} 
            alt={product.images[0]?.alt || product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              -{product.discountPercentage}%
            </div>
          )}
          <div className="absolute top-3 right-3">
            <SustainabilityBadge score={product.sustainabilityMetrics.packagingScore} />
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Sustainability Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {sustainabilityBadges.slice(0, 3).map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <span
                key={index}
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${badge.color}-100 text-${badge.color}-800`}
              >
                <IconComponent className="h-3 w-3 mr-1" />
                {badge.label}
              </span>
            );
          })}
          {sustainabilityBadges.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{sustainabilityBadges.length - 3} more
            </span>
          )}
        </div>
        
        {/* Supplier Info */}
        <div className="text-xs text-gray-500 mb-3">
          By {product.supplier.name} • {product.supplier.location}
        </div>
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.inventory.stock === 0}
            className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
        
        {/* Stock Information */}
        {product.inventory.stock < 10 && product.inventory.stock > 0 && (
          <div className="text-xs text-orange-600 mt-2">
            Only {product.inventory.stock} left in stock!
          </div>
        )}
        {product.inventory.stock === 0 && (
          <div className="text-xs text-red-600 mt-2">
            Out of stock
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;