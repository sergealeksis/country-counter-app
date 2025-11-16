import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  arrayRemove } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';


export const saveWishlistToFirestore = async (userId, wishlist) => {
  try {
    const userDocRef = doc(db, 'wishlists', userId);
    await setDoc(userDocRef, {
      wishlist: wishlist,
      userName: auth.currentUser.displayName || 'Traveler',
      lastUpdated: new Date()
    });
  } catch (err) {
    console.error('Error saving wishlist:', err);
  }
};

export const loadWishlistFromFirestore = async (userId) => {
  try {
    const userDocRef = doc(db, 'wishlists', userId);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data().wishlist || []
    } else {
      return []
    }
  } catch (err) {
    console.error('Error loading wishlist:', err);
    return []
    }
};

export const addCountryToWishlist = async (userId, countryCode) => {
    const userDocRef = doc(db, 'wishlists', userId);
  try {
    await updateDoc(userDocRef, {
      wishlist: arrayUnion(countryCode),
      userName: auth.currentUser.displayName || 'Traveler',
      lastUpdated: new Date()
    });
  } catch (err) {
    if (err.code === 'not-found') {
      await setDoc(userDocRef, {
        wishlist: [countryCode],
        userName: auth.currentUser.displayName || 'Traveler',
        lastUpdated: new Date()
      });
    } else {
      console.error('Error adding country to wishlist:', err);
    }
  }
};

export const removeCountryFromWishlist = async (userId, countryCode) => {
  try {
    const userDocRef = doc(db, 'wishlists', userId);
    await updateDoc(userDocRef, {
      wishlist: arrayRemove(countryCode),
      userName: auth.currentUser.displayName || 'Traveler',
      lastUpdated: new Date()
    });
  } catch (err) {
    console.error('Error removing country from wishlist:', err);
  }
};