import { create } from 'zustand';
import { productService } from '../services/productService';

export const useProductStore = create((set, get) => ({
  trendingProducts: [],
  isLoadingTrending: false,
  errorTrending: null,

  fetchTrendingProducts: async () => {
    set({ isLoadingTrending: true, errorTrending: null });
    try {
      const data = await productService.getTrendingProducts();
      set({ trendingProducts: data, isLoadingTrending: false });
    } catch (error) {
      set({ errorTrending: error.message, isLoadingTrending: false });
    }
  },

  currentProduct: null,
  isLoadingCurrentProduct: false,
  errorCurrentProduct: null,

  fetchProductById: async (id) => {
    set({ isLoadingCurrentProduct: true, errorCurrentProduct: null });
    try {
      const data = await productService.getProductById(id);
      set({ currentProduct: data, isLoadingCurrentProduct: false });
    } catch (error) {
      set({ errorCurrentProduct: error.message, isLoadingCurrentProduct: false });
    }
  },

  categoryProducts: [],
  isLoadingCategory: false,
  errorCategory: null,

  fetchProductsByCategory: async (category) => {
    set({ isLoadingCategory: true, errorCategory: null });
    try {
      const res = await productService.getByCategory(category);
      const data = res.content ? res.content : res;
      set({ categoryProducts: data, isLoadingCategory: false });
    } catch (error) {
      set({ errorCategory: error.message, isLoadingCategory: false });
    }
  },

  searchResults: [],
  isLoadingSearch: false,
  errorSearch: null,

  fetchSearchResults: async (query) => {
    set({ isLoadingSearch: true, errorSearch: null });
    try {
      const res = await productService.getFilteredProducts({ search: query });
      const data = res.content ? res.content : res;
      set({ searchResults: data, isLoadingSearch: false });
    } catch (error) {
      set({ errorSearch: error.message, isLoadingSearch: false });
    }
  },
}));
