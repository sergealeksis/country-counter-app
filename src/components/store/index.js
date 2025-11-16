import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { wishSlice } from "../WishListComponent/reducer";
import { themeSlice } from "../Button/reducer";
import { visitedSlice } from "../VisitedListComponent/reducer";
import { notificationSlice } from "../../constans/functions/notificationSlice";


const rootReducer = combineReducers({
    wishList: wishSlice.reducer,
    theme: themeSlice.reducer,
    visitedList: visitedSlice.reducer,
    notifications: notificationSlice.reducer
})
        


export const store = configureStore({
    reducer: rootReducer,
    
});

