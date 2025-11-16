const WISHLIST_STORAGE_KEY = 'country_wishlist';
const VISITED_STORAGE_KEY = 'country_visited';
const USER_STORAGE_KEY = 'current_user';

export const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data))
    } catch (err) {
        console.error('Error saving to localStorage:', err)
    }

};

export const loadFromStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null
    } catch (err) {
        console.error('Error loading from localStorage:', err)
        return null
    }
};

export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key)
    } catch (err) {
        console.error('Error removing from localStorage:', err)
    } 
}

export const saveWishlistToStorage = (wishlist) => {
    saveToStorage(WISHLIST_STORAGE_KEY, {
        data: wishlist,
        timestamp: Date.now()
    })
};

export const loadWishlistFromStorage = () => {
    const storedData = loadFromStorage(WISHLIST_STORAGE_KEY);
    return storedData ? storedData.data : null
}

export const saveVisitedlistToStorage = (visitedlist) => {
    saveToStorage(VISITED_STORAGE_KEY, {
        data: visitedlist,
        timestamp: Date.now()
    })
};

export const loadVisitedlistFromStorage = () => {
    const storedData = loadFromStorage(VISITED_STORAGE_KEY);
    return storedData ? storedData.data : null
};

export const saveUserToStorage = (userId) => {
    saveToStorage(USER_STORAGE_KEY, userId)
};

export const loadUserFromStorage = () => {
    loadFromStorage(USER_STORAGE_KEY)
};

export const clearUserStorage = () => {
    removeFromStorage(WISHLIST_STORAGE_KEY);
    removeFromStorage(VISITED_STORAGE_KEY);
    removeFromStorage(USER_STORAGE_KEY);
}