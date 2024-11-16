import React, { useContext, useEffect, useState } from "react";
import { Songs } from "../../data/songs/data";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../../Redux/slices/SongSlice";
import { IsplayingContext } from "../Context";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import songanim from "../../anim/songanim.lottie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { pink } from "@mui/material/colors";

const SongComp1 = () => {
  const [playingSongId, setPlayingSongId] = useState(1);
  const { isPlaying, setIsPlaying } = useContext(IsplayingContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(playSong(playingSongId));
  }, [playingSongId]);

  const handleOnclick = (id) => {
    setPlayingSongId(id);
    setIsPlaying(true);
  };

  const popularSongs = useSelector((state) => state.songs.popularSongs);

  const fetchsongs = () => {
    return popularSongs.map((song, index) => (
      <li
        key={song.songId}
        className="li-popular relative group"
        onClick={() => handleOnclick(song.songId)}
      >
        <img src={song.img} alt="img" className="img-popular" />
        <div className="disc-popular-blur">
          <div>
            <p className="line-clamp-1">{song.name}</p>
            <p className="text-gray-300 line-clamp-1">{song.artist}</p>
            <p className="text-gray-300 line-clamp-1">{song.play}</p>
          </div>
          <div className="flex">
            {song.play && isPlaying && (
              <div className="lottifile">
                <DotLottieReact
                  src={songanim}
                  loop
                  autoplay
                  style={{
                    width: "40px",
                    height: "20px",
                    filter: "invert(50%) brightness(100%)", // Adjusted for a fully white effect
                  }}
                />
              </div>
            )}

            <div className="flex justify-center items-center">
              {song.liked ? (
                <FavoriteIcon sx={{ color: pink[500], fontSize: 20 }} />
              ) : (
                <FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }} />
              )}
            </div>

            {/* <span className="pauseIconStyle">
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
            </span> */}
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="overflow-hidden px-5 md:px-8">
      <div>
        <h4 className="text-white text-sm font-semibold mb-2">
          Popular Alubums
        </h4>
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
