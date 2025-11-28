import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Sun, Zap, ShoppingBag, TrendingUp } from 'lucide-react';

const Home = () => {
  const sustainabilityStats = [
    { icon: Leaf, label: 'Organic Products', value: '500+' },
    { icon: Recycle, label: 'Recycled Items', value: '300+' },
    { icon: Sun, label: 'Fair Trade', value: '200+' },
    { icon: Zap, label: 'Energy Saved', value: '50k kWh' }
  ];

  const featuredCategories = [
    {
      name: 'Eco-Friendly Clothing',
      description: 'Sustainable fashion from ethical brands',
      image: '/api/placeholder/400/300',
      link: '/products?category=clothing'
    },
    {
      name: 'Organic Food',
      description: 'Locally sourced organic produce',
      image: '/api/placeholder/400/300',
      link: '/products?category=food'
    },
    {
      name: 'Green Home',
      description: 'Eco-friendly home essentials',
      image: '/api/placeholder/400/300',
      link: '/products?category=home'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Shop Sustainable.
              <span className="block text-green-600">Save the Planet.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover eco-friendly products that align with UN Sustainable Development Goal 12. 
              Every purchase makes a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
              >
                Shop Sustainable Products
              </Link>
              <Link
                to="/sustainability"
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors text-lg font-semibold"
              >
                View Your Impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Making a Difference Together
            </h2>
            <p className="text-gray-600 text-lg">
              Join our community of conscious consumers
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sustainabilityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sustainable Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our carefully curated eco-friendly product categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="h-48 bg-green-200 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SDG 12 Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Supporting UN Sustainable Development Goal 12
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              We're committed to promoting responsible consumption and production patterns. 
              Our platform ensures that every product meets strict sustainability criteria 
              and contributes to a circular economy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <ShoppingBag className="h-8 w-8 text-green-200 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Responsible Consumption</h3>
                  <p className="text-green-100">
                    Choose products that minimize environmental impact and support ethical practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <TrendingUp className="h-8 w-8 text-green-200 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sustainable Production</h3>
                  <p className="text-green-100">
                    Support brands that use eco-friendly materials and production methods.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Leaf className="h-8 w-8 text-green-200 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Circular Economy</h3>
                  <p className="text-green-100">
                    Promote products designed for reuse, recycling, and reduced waste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of conscious consumers who are transforming their shopping habits 
            for a better planet.
          </p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold inline-flex items-center"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Start Sustainable Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;