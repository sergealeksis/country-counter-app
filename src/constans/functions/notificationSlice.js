import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        wishlist: false,
        visitedlist: false
    },
    reducers: {
        showWishlistNotification: (state) => {
            state.wishlist = true
        },
        hideWishlistNotification: (state) => {
            state.wishlist = false
        },
        showVisitedlistNotification: (state) => {
            state.visitedlist = true
        },
        hideVisitedNotification: (state) => {
            state.visitedlist = false
        }
    }
})

export const {
    showWishlistNotification,
    hideWishlistNotification,
    showVisitedlistNotification,
    hideVisitedNotification
} = notificationSlice.actions

