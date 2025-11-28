import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  Leaf, 
  Recycle, 
  Sun, 
  MapPin,
  ArrowLeft
} from 'lucide-react';
import { productService } from '../services/ProductService';
import { useCart } from '../hooks/useCart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SustainabilityBadge from '../components/common/SustainabilityBadge';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id)
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // You can add a toast notification here
      alert(`${quantity} ${product.name} added to cart!`);
    }
  };

  const sustainabilityFeatures = [
    { 
      condition: product?.sustainabilityMetrics?.isOrganic, 
      icon: Leaf, 
      label: 'Organic', 
      description: 'Grown without synthetic pesticides or fertilizers' 
    },
    { 
      condition: product?.sustainabilityMetrics?.isRecycled, 
      icon: Recycle, 
      label: 'Recycled', 
      description: 'Made from recycled materials' 
    },
    { 
      condition: product?.sustainabilityMetrics?.isFairTrade, 
      icon: Sun, 
      label: 'Fair Trade', 
      description: 'Ethically sourced with fair wages' 
    },
    { 
      condition: product?.sustainabilityMetrics?.isLocal, 
      icon: MapPin, 
      label: 'Local', 
      description: 'Locally produced to reduce carbon footprint' 
    }
  ].filter(feature => feature.condition);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner size="lg" text="Loading product details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="text-red-600 text-lg mb-4">Error loading product</div>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="text-gray-600 text-lg mb-4">Product not found</div>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]?.url || '/api/placeholder/600/600'}
              alt={product.images[selectedImage]?.alt || product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <SustainabilityBadge score={product.sustainabilityMetrics.packagingScore} />
                <span className="text-sm text-gray-500">
                  by {product.supplier.name}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-3xl font-bold text-green-600">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                    Save {product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* Sustainability Features */}
          {sustainabilityFeatures.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Sustainability Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sustainabilityFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-800">{feature.label}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Supplier Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">About the Supplier</h3>
            <p className="text-gray-700 mb-2">
              <strong>{product.supplier.name}</strong> - {product.supplier.location}
            </p>
            <p className="text-sm text-gray-600">
              Ethical Rating: {product.supplier.ethicalRating}/5
            </p>
            {product.supplier.sustainabilityCertifications.length > 0 && (
              <div className="mt-2">
                <div className="text-sm font-medium text-gray-700 mb-1">Certifications:</div>
                <div className="flex flex-wrap gap-1">
                  {product.supplier.sustainabilityCertifications.map((cert, index) => (
                    <span key={index} className="px-2 py-1 bg-white text-xs rounded border">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <div className="border-t pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {product.inventory.stock} available
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.inventory.stock === 0}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Truck className="h-4 w-4" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Leaf className="h-4 w-4" />
                <span>Eco-friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Impact Details */}
      <div className="mt-12 bg-green-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-lg font-bold text-green-600 mb-1">
              {product.sustainabilityMetrics.carbonFootprint || 0} kg
            </div>
            <div className="text-sm text-gray-600">Carbon Footprint</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-lg font-bold text-blue-600 mb-1">
              {product.sustainabilityMetrics.waterUsage || 0} L
            </div>
            <div className="text-sm text-gray-600">Water Usage</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-lg font-bold text-yellow-600 mb-1">
              {product.sustainabilityMetrics.energyConsumption || 0} kWh
            </div>
            <div className="text-sm text-gray-600">Energy Consumption</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-lg font-bold text-purple-600 mb-1">
              {product.sustainabilityMetrics.packagingScore}/5
            </div>
            <div className="text-sm text-gray-600">Packaging Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;