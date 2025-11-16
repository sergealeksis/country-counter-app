import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  arrayRemove } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';

export const saveVisitedlistToFirestore = async (userId, visitedlist) => {
  try {
    const userDocRef = doc(db, 'visitedlists', userId);
    await setDoc(userDocRef, {
      visitedlist: visitedlist,
      userName: auth.currentUser.displayName || 'Traveler',
      lastUpdated: new Date()
    });
  } catch (err) {
    console.error('Error saving visited countries list:', err);
  }
};

export const loadVisitedlistFromFirestore = async (userId) => {
  try {
    const userDocRef = doc(db, 'visitedlists', userId);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data().visitedlist || []
    } else {
      return []
    }
  } catch (err) {
    console.error('Error loading visited countries list:', err);
    return []
    }
};

export const addCountryToVisitedlist = async (userId, countryCode) => {
    const userDocRef = doc(db, 'visitedlists', userId);
  try {
    await updateDoc(userDocRef, {
      visitedlist: arrayUnion(countryCode),
      userName: auth.currentUser.displayName || 'Traveler',
      lastUpdated: new Date()
    });
  } catch (err) {
    if (err.code === 'not-found') {
      await setDoc(userDocRef, {
        visitedlist: [countryCode],
        userName: auth.currentUser.displayName || 'Traveler',
        lastUpdated: new Date()
      });
    } else {
      console.error('Error adding country to visited list:', err);
    }
  }
};

export const removeCountryFromVisitedlist = async (userId, countryCode) => {
  try {
    const userDocRef = doc(db, 'visitedlists', userId);
    await updateDoc(userDocRef, {
      visitedlist: arrayRemove(countryCode),
      userName: auth.currentUser.displayName || 'Traveler',
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Error removing country from visited list:', error);
  }
};