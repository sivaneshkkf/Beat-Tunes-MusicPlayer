import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../Config/supabase";

const initialState = {
  songsList: [],
  playingSong: {},
  popularSongs: [],
  topPlayedSongs: [],
  searchList: [],
  userDetails: {},
  userLikedSongs: [],
};

const songSlicer = createSlice({
  name: "songSlice",
  initialState,
  reducers: {
    addSongs: (state, action) => {
      state.songsList = action.payload;

      state.songsList = state.songsList.map(
        (song) =>
          song.songId === action.payload
            ? { ...song, play: true }
            : { ...song, play: false } // Reset play state for other songs
      );
    },

    playSong: (state, action) => {
      // Find the song to play and toggle its `play` status
      state.playingSong = state.songsList.find(
        (song) => song.songId === action.payload
      );
    },

    popularSongs: (state, action) => {
      state.popularSongs = state.songsList.filter(
        (song) => song.album === action.payload
      );
    },
    topPlayedSongs: (state, action) => {
      state.filteredSongs = state.songsList.filter(
        (song) => song.album === action.payload
      );
    },
    searchList: (state, action) => {
      state.searchList = state.songsList.filter((song) => {
        // Convert the song name and search term to lowercase to make the search case-insensitive
        const songName = song.name.toLowerCase();
        const searchTerm = action.payload.toLowerCase();

        // Check if every character in the search term is present in the song name
        return searchTerm.split("").every((char) => songName.includes(char));
      });
    },
    nextSong: (state, action) => {
      const id = action.payload;
      const currentIndex = state.songsList.findIndex(
        (song) => song.songId === id
      );
      //console.log(action.payload, currentIndex);
      if (currentIndex < state.songsList.length - 1) {
        // Find the next song, or loop back to the first song if at the end of the list
        const nextIndex = currentIndex + 1;
        state.playingSong = state.songsList[nextIndex];
      } else {
        state.playingSong = state.songsList[0];
      }
    },

    prevSong: (state, action) => {
      const id = action.payload;
      const currentIndex = state.songsList.findIndex(
        (song) => song.songId === id
      );
      //console.log(action.payload, currentIndex);
      if (currentIndex > 0) {
        // Find the next song, or loop back to the first song if at the end of the list
        const nextIndex = currentIndex - 1;
        state.playingSong = state.songsList[nextIndex];
      } else {
        state.playingSong = state.songsList[state.songsList.length - 1];
      }
    },

    addUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },

    getUserLikedSongs: (state, action) => {
      state.userLikedSongs = action.payload;

      state.songsList = state.songsList.map((song) => {
        const songId = song.songId;
        // Return the updated song object with the `liked` property
        return state.userLikedSongs.includes(songId)
          ? { ...song, liked: true }
          : { ...song, liked: false };
      });

      state.popularSongs = state.popularSongs.map((song) => {
        const songId = song.songId;
        // Return the updated song object with the `liked` property
        return state.userLikedSongs.includes(songId)
          ? { ...song, liked: true }
          : { ...song, liked: false };
      });
    },

    likedClick: (state, action) => {
        if(state.userLikedSongs.includes(action.payload)){
            state.userLikedSongs = state.userLikedSongs.filter(id => id !== action.payload)
        }else {
            state.userLikedSongs.push(action.payload)
        }
        state.songsList = state.songsList.map((song) => {
          if (state.userLikedSongs.includes(song.songId)) {
            // If the song is already in the userLikedSongs array, set 'liked' to true
            return { ...song, liked: true };
          } else {
            // For all other songs, set 'liked' to false
            return { ...song, liked: false };
          }
        });

        state.popularSongs = state.popularSongs.map((song) => {
          if (state.userLikedSongs.includes(song.songId)) {
            // If the song is already in the userLikedSongs array, set 'liked' to true
            return { ...song, liked: true };
          } else {
            // For all other songs, set 'liked' to false
            return { ...song, liked: false };
          }
        });
      },
      
  },
});

export const {
  addSongs,
  playSong,
  popularSongs,
  topPlayedSongs,
  searchList,
  nextSong,
  prevSong,
  addUserDetails,
  getUserLikedSongs,
  likedClick,
} = songSlicer.actions;

export default songSlicer.reducer;
