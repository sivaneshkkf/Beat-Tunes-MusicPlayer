import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../Config/supabase";

const initialState = {
    songsList: [],
    playingSong: {},
    popularSongs: [],
    topPlayedSongs:[],
    searchList: [],
    userDetails: {},
    userLikedSongs:{},
};

const songSlicer = createSlice({
    name: 'songSlice',
    initialState,
    reducers: {
        addSongs: (state, action) => {
            state.songsList = action.payload;
        },

        playSong: (state, action) => {
            // Find the song to play and toggle its `play` status
            state.playingSong = state.songsList.find(song => song.songId === action.payload);

            state.songsList = state.songsList.map(song =>
                song.songId === action.payload
                    ? { ...song, play: !song.play }
                    : { ...song, play: false } // Reset play state for other songs
            );
        },

        popularSongs: (state, action) => {
            state.popularSongs = state.songsList.filter(song => song.album === action.payload);
        },
        topPlayedSongs: (state, action) => {
            state.filteredSongs = state.songsList.filter(song => song.album === action.payload);
        },
        searchList: (state, action) => {
            state.searchList = state.songsList.filter(song => {
                // Convert the song name and search term to lowercase to make the search case-insensitive
                const songName = song.name.toLowerCase();
                const searchTerm = action.payload.toLowerCase();
        
                // Check if every character in the search term is present in the song name
                return searchTerm.split('').every(char => songName.includes(char));
            });
        },
        nextSong: (state, action) => {
            const id = action.payload;
            const currentIndex = state.songsList.findIndex(song => song.songId === id);
            console.log(action.payload, currentIndex)
            if (currentIndex < state.songsList.length-1) {
              // Find the next song, or loop back to the first song if at the end of the list
              const nextIndex = (currentIndex + 1)
              state.playingSong = state.songsList[nextIndex];
            }else{
                state.playingSong = state.songsList[0];
            }
          },

          prevSong: (state, action) => {
            const id = action.payload;
            const currentIndex = state.songsList.findIndex(song => song.songId === id);
            console.log(action.payload, currentIndex)
            if (currentIndex > 0) {
              // Find the next song, or loop back to the first song if at the end of the list
              const nextIndex = (currentIndex - 1)
              state.playingSong = state.songsList[nextIndex];
            }else{
                state.playingSong = state.songsList[state.songsList.length-1];
            }
          },


          addUserDetails: (state, action) => {
            state.userDetails = action.payload
          },

          getUserLikedSongs : async(state, action) => {
               state.userLikedSongs = action.payload
          }
          
        
    },
});

export const { addSongs, playSong, popularSongs, topPlayedSongs, searchList, nextSong, prevSong, addUserDetails, getUserLikedSongs } = songSlicer.actions;

export default songSlicer.reducer;
