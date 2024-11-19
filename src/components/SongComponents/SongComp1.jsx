import React, { useContext, useEffect, useState } from "react";
import { Songs } from "../../data/songs/data";
import { useDispatch, useSelector } from "react-redux";
import { likedClick, playSong } from "../../Redux/slices/SongSlice";
import { IsplayingContext } from "../Context";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import songanim from "../../anim/songanim.lottie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { pink } from "@mui/material/colors";
import {
  LoginFormOpenContext,
  UserDetailsContext,
} from "../context/LoginContext";
import supabase from "../../Config/supabase";
import { motion } from "framer-motion";
import { PlayingContext } from "../context/PlayingContext";

const SongComp1 = () => {
  const {playingSongId, setPlayingSongId} = useContext(PlayingContext);
  const { isPlaying, setIsPlaying } = useContext(IsplayingContext);
  const { userDetails } = useContext(UserDetailsContext);
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormOpenContext);
  const [likedBtnAnim, setLikedBtnAnim] = useState(-1);

  const userLikedSongs = useSelector((state) => state.songs.userLikedSongs);

  const dispatch = useDispatch();

  const handleOnclick = (id) => {
    //console.log(id);
    setPlayingSongId(id);
    setIsPlaying(true);
  };

  useEffect(() => {
    dispatch(playSong(playingSongId));
  }, [playingSongId]);

  function handleLike(id) {
    if (userDetails) {
      if (userLikedSongs.includes(id)) {
        const updatedArray = userLikedSongs.filter((songId) => songId !== id);
        updateTable(updatedArray);
        dispatch(likedClick(id));
      } else {
        const updatedArray = [...userLikedSongs, id];
        updateTable(updatedArray);
        dispatch(likedClick(id));
      }
    } else {
      alert("Please sign in to add songs to your favorites.")
      setLoginFormOpen(true);
    }
  }

  async function updateTable(arr) {
    const { error } = await supabase
      .from("likedSongs")
      .update({ songs: arr })
      .eq("user_id", userDetails.sub);

    if (error) {
      console.log("Update Table error: ", error.message);
      return;
    }
  }

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
                    filter: "invert(50%) brightness(100%)",
                  }}
                />
              </div>
            )}

            <div
              className="flex justify-center items-center p-2"
              onClick={(event) => {
                // Stop the like button's click event from triggering the parent `li`'s `onClick`
                event.stopPropagation();
                handleLike(song.songId);
                setLikedBtnAnim(song.songId);
              }}
            >
              {song.liked ? (
                <div className="flex justify-center items-center relative">
                  <FavoriteIcon sx={{ color: pink[500], fontSize: 20 }} />
                  {likedBtnAnim === song.songId && (
                    <motion.span
                      className="absolute"
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: [0, -100, 0], opacity: [0, 1, 0, 0, 0] }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      style={{ willChange: "transform" }}
                    >
                      <FavoriteIcon sx={{ color: pink[500], fontSize: 20 }} />
                    </motion.span>
                  )}
                </div>
              ) : (
                <FavoriteBorderOutlinedIcon
                  sx={{ color: "white", fontSize: 20 }}
                />
              )}
            </div>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="overflow-hidden px-5 md:px-8 mt-5 w-full lg:w-9/12">
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
