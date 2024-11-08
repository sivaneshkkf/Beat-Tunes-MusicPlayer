import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songsList: [],
    playingSong: {},
    popularSongs: [],
    topPlayedSongs:[],
};

const songSlicer = createSlice({
    name: 'songSlice',
    initialState,
    reducers: {
        addSongs: (state, action) => {
            state.songsList = action.payload;
        },

        playSong: (state, action) => {
            state.playingSong = state.songsList.find(song => song.songId === action.payload);
        },

        popularSongs: (state, action) => {
            state.popularSongs = state.songsList.filter(song => song.album === action.payload);
        },
        topPlayedSongs: (state, action) => {
            state.filteredSongs = state.songsList.filter(song => song.album === action.payload);
        },
    },
});

export const { addSongs, playSong, popularSongs, topPlayedSongs } = songSlicer.actions;

export default songSlicer.reducer;
