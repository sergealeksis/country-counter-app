import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

export const wishlistService = {
  async saveWishlist(userId, countries) {
    try {
      const userWishlistRef = doc(db, 'wishlists', userId);
      await setDoc(userWishlistRef, {
        countries: countries,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving wishlist:', error);
      throw error;
    }
  },

  async loadWishlist(userId) {
    try {
      const userWishlistRef = doc(db, 'wishlists', userId);
      const docSnap = await getDoc(userWishlistRef);
      
      if (docSnap.exists()) {
        return docSnap.data().countries || [];
      }
      return [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      throw error;
    }
  }
};