import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addSongs,
  playSong,
  popularSongs,
  searchList,
  topPlayedSongs,
} from "./Redux/slices/SongSlice";
import { Songs } from "./data/songs/data";
import PlayingSongComp from "./components/Playsong";
import { IsplayingContext } from "./components/Context";
import SideNav from "./pages/SideNav";

const App = () => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    dispatch(addSongs(Songs));
    dispatch(popularSongs("popular"));
    dispatch(topPlayedSongs("topPlayed"));
    dispatch(playSong(1));
  }, [dispatch]);

  return (
    <IsplayingContext.Provider value={{ isPlaying, setIsPlaying }}>
      <div className="h-full flex overflow-hidden bg-gradient-to-br from-primary via-middle to-secondary bg-cover bg-no-repeat">
        <SideNav />
        <div className="w-full h-screen">
          <Header />
          <div className="overflow-y-auto h-full scrollbar-hidden">
            <Outlet />
          </div>
          <PlayingSongComp />
        </div>
      </div>
    </IsplayingContext.Provider>
  );
};

export default App;
