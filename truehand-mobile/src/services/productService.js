import api from './api';

export const productService = {
  // Get paginated list of all products
  getAllProducts: async (page = 0, size = 10) => {
    const response = await api.get(`/products?page=${page}&size=${size}`);
    return response.data; // Expected format: Page<ProductDTO> (Spring Boot)
  },

  // Get a single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data; // Expected format: ProductDTO
  },

  // Get trending products
  getTrendingProducts: async () => {
    const response = await api.get('/products/trending');
    return response.data; // Expected format: List<ProductDTO>
  },

  // Get recommendations for a product
  getRecommendations: async (id) => {
    const response = await api.get(`/products/${id}/recommendations`);
    return response.data; // Expected format: List<ProductDTO>
  },

  // Filter products
  getFilteredProducts: async ({ search, category, minPrice, maxPrice, minRating, page = 0, size = 10 }) => {
    let url = `/products/filter?page=${page}&size=${size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;
    if (minRating) url += `&minRating=${minRating}`;
    
    const response = await api.get(url);
    return response.data; // Expected format: Page<ProductDTO>
  },

  // Search by name
  searchByName: async (name) => {
    const response = await api.get(`/products/search/${encodeURIComponent(name)}`);
    return response.data;
  },

  // Get by category
  getByCategory: async (category) => {
    const response = await api.get(`/products/category/${encodeURIComponent(category)}`);
    return response.data;
  },

  // Get products by a specific seller
  getProductsBySeller: async (sellerId) => {
    const response = await api.get(`/products/seller/${sellerId}`);
    return response.data;
  },

  // Create product
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};
