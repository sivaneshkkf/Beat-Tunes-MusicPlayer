import React from "react";
import SongComp1 from "../components/SongComponents/SongComp1";
import SongComp2 from "../components/SongComponents/SongComp2";
import FavouriteSongs from "../components/SongComponents/FavouriteSongs";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  return (
    <div className="h-full mt-2">
      <div className="mx-5">
        <ImageSlider />
      </div>
      <SongComp1 />
      <SongComp2 />
    </div>
  );
};

export default Home;
