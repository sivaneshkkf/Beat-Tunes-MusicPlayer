import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./slices/SongSlice"



export const Store = configureStore({
    reducer:{
        songs : songReducer
    }
})