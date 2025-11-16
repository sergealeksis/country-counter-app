import { createSlice } from "@reduxjs/toolkit";
import { COUNTRY_INFO } from "../../constans/countries/countries";
import { auth } from "../../firebase.config";
import { addCountryToVisitedlist, 
         loadVisitedlistFromFirestore, 
         removeCountryFromVisitedlist, 
         saveVisitedlistToFirestore } from "../../constans/functions/visitedlistServices";
import { loadVisitedlistFromStorage, saveVisitedlistToStorage } from "../../constans/functions/storage";
import { showVisitedlistNotification } from "../../constans/functions/notificationSlice";

const updateCountryInfoVisited = (visitedList) => {
  Object.keys(COUNTRY_INFO).forEach(e => {
    COUNTRY_INFO[e].visited = false;
  });
  
  visitedList.forEach(e => {
    if (COUNTRY_INFO[e]) {
      COUNTRY_INFO[e].visited = true;
    }
  });
};


export const visitedSlice = createSlice({
    name: 'visitedList',
    initialState: {
        visited: [],
        isLoading: false,
        isLoadedFromCache: false
    },
    reducers: {
        setVisitedlist: (state, { payload }) => {
            state.visited = payload;
            updateCountryInfoVisited(payload);
            saveVisitedlistToStorage(payload);
        },

        setVisitedlistFromCache: (state, { payload }) => {
            state.visited = payload;
            updateCountryInfoVisited(payload);
            state.isLoadedFromCache = true;
        },

        addToVisitedList: (state, { payload }) => {
            if (!state.visited.includes(payload)) {
                state.visited.push(payload);
                if (COUNTRY_INFO[payload]) {
                    COUNTRY_INFO[payload].visited = true;
                }
            saveVisitedlistToStorage(state.visited);
            }
        },

        removeFromVisitedList: (state, { payload }) => {
            state.visited = state.visited.filter(e => e !== payload);
            if (COUNTRY_INFO[payload]) {
                COUNTRY_INFO[payload].visited = false;
            }
            saveVisitedlistToStorage(state.visited);
        },

        clearVisitedList: (state) => {
            state.visited.forEach(code => {
            if (COUNTRY_INFO[code]) {
                COUNTRY_INFO[code].visited = false;
            }
            });
            state.visited = [];
            saveVisitedlistToStorage([]);
        },

        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        
        setLoadedFromCache: (state, { payload }) => {
            state.isLoadedFromCache = payload;
        }  
    }
})

export const { 
    addToVisitedList, 
    removeFromVisitedList, 
    clearVisitedList,
    setVisitedlist,
    setVisitedlistFromCache,
    setLoading,
    setLoadedFromCache,
} = visitedSlice.actions;

// Thunks
export const addCountryToVisitedWithSync = (countryCode) => async (dispatch) => {
    try {
        dispatch(addToVisitedList(countryCode));
        if (auth.currentUser) {
            await addCountryToVisitedlist(auth.currentUser.uid, countryCode);
        }
        dispatch(showVisitedlistNotification())
    } catch (err) {
        console.error('Error adding country to visited:', err);
        dispatch(removeFromVisitedList(countryCode));
    }
};

export const removeCountryFromVisitedWithSync = (countryCode) => async (dispatch) => {
    try {
        dispatch(removeFromVisitedList(countryCode));
        if (auth.currentUser) {
            await removeCountryFromVisitedlist(auth.currentUser.uid, countryCode);
        }
    } catch (err) {
        console.error('Error removing country from visited:', err);
        dispatch(addToVisitedList(countryCode));
    }
};

export const clearVisitedListWithSync = () => async (dispatch) => {
    try {
        dispatch(clearVisitedList());
        if (auth.currentUser) {
            await saveVisitedlistToFirestore(auth.currentUser.uid, []);
        }
    } catch (err) {
        console.error('Error clearing visited list:', err);
    }
};

export const loadUserVisitedlist = () => async (dispatch) => {
    if (!auth.currentUser) return;

    const cachedVisitedlist = loadVisitedlistFromStorage();
    
    if (cachedVisitedlist && cachedVisitedlist.length > 0) {
        dispatch(setVisitedlistFromCache(cachedVisitedlist));
    }

    try {
        dispatch(setLoading(true));
        const newVisitedlist = await loadVisitedlistFromFirestore(auth.currentUser.uid);
        
        if (JSON.stringify(cachedVisitedlist) !== JSON.stringify(newVisitedlist)) {
            dispatch(setVisitedlist(newVisitedlist));
        } else {
            dispatch(setLoading(false));
        }
        
    } catch (err) {
        console.error('Error loading visitedlist from Firestore:', err);
        dispatch(setLoading(false));
    }
};