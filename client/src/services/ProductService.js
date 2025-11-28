import api from './api';

export const productService = {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const response = await api.get(`/products?${params}`);
    return response.data;
  },

  // Get single product by ID
  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  async getProductsByCategory(categoryId, filters = {}) {
    const params = new URLSearchParams({ category: categoryId });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const response = await api.get(`/products?${params}`);
    return response.data;
  },

  // Search products
  async searchProducts(query, filters = {}) {
    const params = new URLSearchParams({ search: query });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const response = await api.get(`/products?${params}`);
    return response.data;
  },

  // Get featured products (for homepage)
  async getFeaturedProducts() {
    const response = await api.get('/products?sortBy=popular&limit=8');
    return response.data;
  },

  // Get sustainable products (high packaging score)
  async getSustainableProducts() {
    const response = await api.get('/products?sortBy=sustainability&limit=6');
    return response.data;
  }
};