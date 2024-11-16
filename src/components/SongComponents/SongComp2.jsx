import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likedClick, playSong } from "../../Redux/slices/SongSlice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import songanim from "../../anim/songanim.lottie";
import { IsplayingContext } from "../Context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { pink } from "@mui/material/colors";
import {
  LoginFormOpenContext,
  UserDetailsContext,
} from "../context/LoginContext";
import supabase from "../../Config/supabase";
import { motion } from "framer-motion";

const SongComp2 = () => {
  const [playingSongId, setPlayingSongId] = useState(1);
  const { isPlaying, setIsPlaying } = useContext(IsplayingContext);
  const userLikedSongs = useSelector((state) => state.songs.userLikedSongs);
  const { userDetails } = useContext(UserDetailsContext);
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormOpenContext);
  const [likedBtnAnim, setLikedBtnAnim] = useState(-1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(playSong(playingSongId));
  }, [playingSongId]);

  // console.log(userLikedSongs)
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

  const songsFromRedux = useSelector((state) => state.songs.songsList);

  const fetchSongs = () => {
    return songsFromRedux.map((song, index) => (
      <li
        className="li-topplayed"
        key={song.songId}
        onClick={() => {
          setPlayingSongId(song.songId);
          setIsPlaying(true);
        }}
      >
        <div className="overflow-hidden w-14 h-14 flex justify-center items-center rounded-full">
          <img
            src={song.img}
            alt="singer1"
            className="w-14 h-14 object-cover"
          />
        </div>
        <div className="li-topplayed-disc">
          <p className="text-white text-xs font-semibold line-clamp-1">
            {song.name}
          </p>
          <p className="text-gray-500 text-xs font-medium line-clamp-1">
            {song.artist}
          </p>
        </div>
        {song.play && isPlaying && (
          <div className="lottifile">
            <DotLottieReact
              src={songanim}
              loop
              autoplay
              style={{
                width: "60px",
                height: "30px",
                filter: "invert(50%) brightness(100%)", // Adjusted for a fully white effect
              }}
            />
          </div>
        )}
        <p className="text-xs text-gray-500 hidden">{song.duration}</p>

        <div
          className="flex justify-center items-center p-2"
          onClick={(event) => {
            event.stopPropagation(); // Prevent triggering the parent element's onClick
            handleLike(song.songId); // Handle the like functionality
            setLikedBtnAnim(song.songId); // Trigger the animation
          }}
        >
          {song.liked ? (
            <div className="flex justify-center items-center relative">
              {/* Static Favorite Icon */}
              <FavoriteIcon sx={{ color: pink[500], fontSize: 20 }} />

              {/* Animated Favorite Icon */}
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
            // Unliked (Outlined) Icon
            <FavoriteBorderOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
          )}
        </div>
      </li>
    ));
  };
  return (
    <div className="px-5 pb-60 lg:pb-20 mt-5 md:px-8 w-full col-span-3 lg:w-9/12">
      <div className="mb-2">
        <h3 className="text-white font-semibold">Top Played</h3>
      </div>
      <div>
        <ul
          id="topPlayed"
          className="md:grid md:grid-cols-2 md:gap-5 2xl:grid-cols-3"
        >
          {fetchSongs()}
        </ul>
      </div>
    </div>
  );
};

export default SongComp2;
