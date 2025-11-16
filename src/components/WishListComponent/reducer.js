import { createSlice } from "@reduxjs/toolkit";
import { COUNTRY_INFO } from "../../constans/countries/countries";
import { auth } from "../../firebase.config";
import { addCountryToWishlist, 
         loadWishlistFromFirestore, 
         removeCountryFromWishlist, 
         saveWishlistToFirestore } from "../../constans/functions/wishlistServices";
import { loadWishlistFromStorage, saveWishlistToStorage } from "../../constans/functions/storage";
import { showWishlistNotification } from "../../constans/functions/notificationSlice";

const updateCountryInfoWish = (wishlist) => {
  Object.keys(COUNTRY_INFO).forEach(e => {
    COUNTRY_INFO[e].wish = false;
  });
  
  wishlist.forEach(e => {
    if (COUNTRY_INFO[e]) {
      COUNTRY_INFO[e].wish = true;
    }
  });
};

export const wishSlice = createSlice({
    name: 'wishList',
    initialState: {
        wishlist: [],
        isLoading: false,
        isLoadedFromCache: false
    },
    reducers: {
        setWishlist: (state, { payload }) => {
            state.wishlist = payload;
            updateCountryInfoWish(payload);
            saveWishlistToStorage(payload)
        },

        setWishlistFromCache: (state, { payload }) => {
            state.wishlist = payload;
            updateCountryInfoWish(payload);
            state.isLoadedFromCache = true;
        },

        addToWishList: (state, { payload }) => {
            if (!state.wishlist.includes(payload)) {
                state.wishlist.push(payload)
                if (COUNTRY_INFO[payload]) {
                    COUNTRY_INFO[payload].wish = true;
                }
            saveWishlistToStorage(state.wishlist);
            }
        },

        removeFromWishList: (state, { payload }) => {
            state.wishlist = state.wishlist.filter(e => e !== payload)
            if (COUNTRY_INFO[payload]) {
                COUNTRY_INFO[payload].wish = false;
            }
            saveWishlistToStorage(state.wishlist);
        }, 

        clearWishList: (state, { payload }) => {
            state.wishlist.forEach(code => {
                if (COUNTRY_INFO[code]) {
                    COUNTRY_INFO[code].wish = false;
                }
            });
            state.wishlist = [];
            saveWishlistToStorage([]);
        },

        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },

        setLoadedFromCache: (state, { payload }) => {
            state.isLoadedFromCache = payload;
        },
    }
})

export const { addToWishList, 
               removeFromWishList,
               clearWishList,
               setWishlist,
               setWishlistFromCache,
               setLoading
             } = wishSlice.actions;

//Thunks
export const addCountryToWishlistSync = (countryCode) => async (dispatch) => {
    try {
        dispatch(addToWishList(countryCode));
        if (auth.currentUser) {
            await addCountryToWishlist(auth.currentUser.uid, countryCode)
        }
        dispatch(showWishlistNotification())
    } catch (err) {
        console.error('Error adding country to wishlist:', err)
        dispatch(removeFromWishList(countryCode))
    }
};

export const removeCountryFromWishlistSync = (countryCode) => async (dispatch) => {
    try {
        dispatch(removeFromWishList(countryCode));
        if (auth.currentUser) {
            await removeCountryFromWishlist(auth.currentUser.uid, countryCode)
        }
    } catch (err) {
        console.error('Error removing country to wishlist:', err)
        dispatch(addToWishList(countryCode))
    }
};

export const clearWishlistWithSync = () => async (dispatch) => {
    try {
        dispatch(clearWishList());
        if (auth.currentUser) {
            await saveWishlistToFirestore(auth.currentUser.uid, []);
        }
    } catch (error) {
        console.error('Error clearing wishlist:', error);
    }
};

export const loadUserWishlist = () => async (dispatch) => {
    if (!auth.currentUser) return;

    const cachedWishlist = loadWishlistFromStorage();
    
    if (cachedWishlist && cachedWishlist.length > 0) {
        dispatch(setWishlistFromCache(cachedWishlist));
    }

    try {
        dispatch(setLoading(true));
        const newWishlist = await loadWishlistFromFirestore(auth.currentUser.uid);
        
        if (JSON.stringify(cachedWishlist) !== JSON.stringify(newWishlist)) {
            dispatch(setWishlist(newWishlist));
        } else {
            dispatch(setLoading(false));
        }
        
    } catch (err) {
        console.error('Error loading wishlist from Firestore:', err);
        dispatch(setLoading(false));
    }
};
