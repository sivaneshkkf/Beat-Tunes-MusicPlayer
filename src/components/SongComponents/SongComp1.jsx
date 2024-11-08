import React, { useEffect, useState } from "react";
import { Songs } from "../../data/songs/data";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../../Redux/slices/SongSlice";

const SongComp1 = () => {

  const [playingSongId, setPlayingSongId] = useState(1)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(playSong(playingSongId))
  },[playingSongId])

  const popularSongs = useSelector((state) => state.songs.popularSongs);

  const fetchsongs = () => {
    return popularSongs.map((song,index) => (
      <li key={song.songId} className="li-popular relative group"
      onClick={() => setPlayingSongId(song.songId)}
      >
        <img src={song.img} alt="img" className="img-popular" />
        <div className="disc-popular-blur">
          <div>
            <p className="line-clamp-1">{song.name}</p>
            <p className="text-gray-300 line-clamp-1">{song.artist}</p>
          </div>
          <div className="flex">
            <div className="playIconStyle">
              <dotlottie-player
                src="https://lottie.host/31c605e2-16f2-44a6-8f22-b187a85c6197/OQvgg4IPQn.json"
                background="transparent"
                speed="1"
                style={{ width: "25px", height: "25px" }}
                loop
                autoplay
              ></dotlottie-player>
            </div>
            <span className="pauseIconStyle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2.5q3.125 0 5.312-2.188Q19.5 15.125 19.5 12q0-3.125-2.188-5.312Q15.125 4.5 12 4.5q-3.125 0-5.312 2.188Q4.5 8.875 4.5 12q0 3.125 2.188 5.312Q8.875 19.5 12 19.5Zm0-1.5q-2.5 0-4.25-1.75T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 2.5-1.75 4.25T12 18Zm-2-2.5l5.5-3.5L10 8.5Z"
                />
              </svg>
            </span>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="overflow-hidden px-5 md:px-8">
        <div>
            <h4 className="text-white text-sm font-semibold mb-2">Popular Alubums</h4>
        </div>
      <ul
        id="popularUl"
        className="grid gap-3 grid-cols-3 sm:flex sm:items-center w-fit sm:gap-5 sm:flex-wrap"
      >
        {fetchsongs()}
      </ul>
    </div>
  );
};

export default SongComp1;
