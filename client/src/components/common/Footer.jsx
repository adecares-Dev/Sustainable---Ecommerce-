import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold">EcoMarket</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted platform for sustainable shopping. We're committed to promoting 
              responsible consumption and production in alignment with UN SDG 12.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-green-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-300 hover:text-green-400 transition-colors">
                  Sustainability Impact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Sustainability */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sustainability</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  SDG 12 Commitment
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Supplier Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  Sustainability Report
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 EcoMarket. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* SDG Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-900 bg-opacity-50 px-4 py-2 rounded-lg">
            <Leaf className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-300">
              Supporting UN Sustainable Development Goal 12: Responsible Consumption & Production
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;