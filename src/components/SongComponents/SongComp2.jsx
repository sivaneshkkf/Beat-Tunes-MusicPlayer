import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../../Redux/slices/SongSlice";

const SongComp2 = () => {


  const [playingSongId, setPlayingSongId] = useState(1)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(playSong(playingSongId))
  },[playingSongId])

  const songsFromRedux = useSelector(state => state.songs.songsList)

  const fetchSongs = () => {
    return songsFromRedux.map((song, index) => (
      <li className="li-topplayed" key={song.songId}
      onClick={() => setPlayingSongId(song.songId)}
      >
      <div
        className="overflow-hidden w-14 h-14 flex justify-center items-center rounded-full"
      >
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
     <div className="lottifile">
       <dotlottie-player src="https://lottie.host/31c605e2-16f2-44a6-8f22-b187a85c6197/OQvgg4IPQn.json" background="transparent" speed="1" style={{width: "25px", height: "25px"}} loop autoplay></dotlottie-player>
     </div>
       <p className="text-xs text-gray-500">{song.duration}</p>

      <div className="text-gray-500 flex items-center gap-3">
       
        <div>
          <span id="pauseIcon" className={`text-white ${song.play ? "hidden" : "block"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
              />
            </svg>
          </span>
          <span id="playIcon" className={`text-white ${song.play ? "block" : "hidden"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9 16h2V8H9zm4 0h2V8h-2zm-1 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
              />
            </svg>
          </span>
        </div>
      </div>
    </li>
    ))
  }
  return (
    <div className="px-5 pb-52 lg:pb-20 mt-5 md:px-8 w-full col-span-3 lg:w-9/12">
      <div className="mb-2">
        <h3 className="text-white font-semibold">Top Played</h3>
      </div>
      <div>
        <ul id="topPlayed" className="md:grid md:grid-cols-2 md:gap-5 2xl:grid-cols-3">

          {fetchSongs()}
        </ul>
      </div>
    </div>
  );
};

export default SongComp2;
