import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSongs, playSong, popularSongs, topPlayedSongs } from "./Redux/slices/SongSlice";
import { Songs } from "./data/songs/data";
import PlayingSongComp from "./components/Playsong";

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(addSongs(Songs))
    dispatch(popularSongs('popular'))
    dispatch(topPlayedSongs('topPlayed'))
    dispatch(playSong(1))
  },[dispatch])

  return (
    <div className="h-full overflow-hidden pb-10 bg-gradient-to-br from-primary via-middle to-secondary bg-cover bg-no-repeat">
      <Header />
      <div className="lg:flex h-full">
        <div className="lg:w-9/12">
          <Outlet />
        </div>
        <div className="lg:w-3/12">
          <PlayingSongComp />
        </div>
      </div>
    </div>
  );
};

export default App;
