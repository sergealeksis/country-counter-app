import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'dark'
    },
    reducers: {
       toggleTheme: (state) => {
      if (state.theme === 'light') {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('white')
        state.theme = 'dark'
      } else {
        document.documentElement.classList.remove('white')
        document.documentElement.classList.add('dark')
        state.theme = 'light'
      }
     }
    }
})

export const { toggleTheme } = themeSlice.actions;

