import { create } from 'zustand';
import { userService } from '../services/userService';
import { reviewService } from '../services/reviewService';
import { useAuthStore } from './useAuthStore';

export const useUserStore = create((set, get) => ({
  wishlist: [],
  isLoadingWishlist: false,

  fetchWishlist: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({ isLoadingWishlist: true });
    try {
      const data = await userService.getWishlist(userId);
      set({ wishlist: data, isLoadingWishlist: false });
    } catch (error) {
      set({ isLoadingWishlist: false });
    }
  },

  addToWishlist: async (productId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    try {
      await userService.addToWishlist(userId, productId);
      get().fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  },

  removeFromWishlist: async (productId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    try {
      await userService.removeFromWishlist(userId, productId);
      get().fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  },

  submitReview: async (reviewDTO) => {
    try {
      await reviewService.addReview(reviewDTO);
    } catch (error) {
      console.error(error);
    }
  }
}));
