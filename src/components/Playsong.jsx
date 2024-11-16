import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import { IsplayingContext } from "./Context";
import { nextSong, prevSong } from "../Redux/slices/SongSlice";
import { formatTime } from "./utils/Format";

const PlayingSongComp = () => {
  const [sliderVal, setSliderVal] = useState({
    MAX: 100,
    VALUE: 0,
    DURATION: 0,
    PER: 0,
  });
  const [duration, setDuration] = useState(0); // Track the duration of the song
  const { isPlaying, setIsPlaying } = useContext(IsplayingContext); // Track if the song is playing
  const audioRef = useRef(null);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  const playingSong = useSelector((state) => state.songs.playingSong);

  const memoizedPlayingSong = useMemo(() => {
    return playingSong;
  }, [playingSong]);

  const loadSong = (src) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load(); // Load the new audio source
    }
  };

  useEffect(() => {
    if (playingSong) {
      //console.log(playingSong)
      loadSong(playingSong.song);
      if (isPlaying) {
        audioRef.current.play();
      }
      //setIsPlaying(true);
    }
  }, [playingSong]);

  // Handle audio metadata load and update slider max/duration
  // let valuePercentage = (sliderVal.VALUE / sliderRef.max) * 100;
  // console.log(sliderRef.max)
  useEffect(() => {
    const song = audioRef.current;
    if (song) {
      const onLoadedMetadata = () => {
        setSliderVal((pre) => ({ ...pre, DURATION: song.duration })); // Set the duration of the song
        if (sliderRef.current) {
          setSliderVal((pre) => ({
            ...pre,
            PER: (song.currentTime / song.duration) * 100,
            MAX: song.duration,
            VALUE: song.currentTime,
          }));
          // sliderRef.current.max = song.duration; // Set max to the audio duration
          // sliderRef.current.value = song.currentTime; // Initialize the slider value
        }
      };

      song.addEventListener("loadedmetadata", onLoadedMetadata);

      // Cleanup the event listener on component unmount
      return () => {
        song.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }
  }, []);

  // Handle time updates and update slider as audio plays
  useEffect(() => {
    const song = audioRef.current;
    if (song) {
      const onTimeUpdate = () => {
        if (sliderRef.current) {
          setSliderVal((pre) => ({
            ...pre,
            PER: (song.currentTime / song.duration) * 100,
            VALUE: song.currentTime,
          }));
        }
      };

      song.addEventListener("timeupdate", onTimeUpdate);

      // Cleanup the event listener on component unmount
      return () => {
        song.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the song if it's playing
        console.log("pause", isPlaying); // Toggle play state
      } else {
        audioRef.current.play(); // Play the song if it's paused
        console.log("play", isPlaying); // Toggle play state
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Sync audio playback with slider when slider is moved manually
  const handleSliderChange = (e, newValue) => {
    const song = audioRef.current;
    if (song) {
      song.currentTime = newValue; // Sync audio time with slider value
      setSliderVal((prev) => ({
        ...prev,
        VALUE: newValue,
        PER: (newValue / song.duration) * 100,
      }));
    }
  };

  const handleNextBtn = (id) => {
    dispatch(nextSong(id));
    //console.log(playingSong);
  };

  const handlePrevBtn = (id) => {
    dispatch(prevSong(id));
    //console.log(playingSong);
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 lg:left-auto lg:mb-5 lg:bottom-0 lg:mr-8 select-none">
      <div className="items-center p-2 gap-3 backdrop-blur-lg bg-white bg-opacity-5 lg:rounded-lg lg:block">
        <div className="flex justify-between items-center lg:block">
          <div className="flex flex-col items-center">
            <div
              id="playImg"
              className={`overflow-hidden w-14 h-14 flex justify-center items-center rounded-full lg:w-52 lg:h-52 lg:rounded-lg xl:w-80 xl:h-72 lg:animate-none ${
                isPlaying ? "animate-spinSlow " : "animate-none"
              }`}
            >
              <img
                id="psImg"
                src={memoizedPlayingSong?.img || ""}
                alt="singer1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 mx-2">
          <div className="flex items-center gap-2">
                <p
                  id="psName"
                  className="text-white text-sm font-semibold line-clamp-1"
                >
                  {memoizedPlayingSong?.name}
                </p>
                <p
                  id="psArtist"
                  className="text-gray-500 text-xs font-medium line-clamp-1"
                >
                  {memoizedPlayingSong?.artist}
                </p>
              </div>

            <div className="relative ml-1">
              <audio ref={audioRef} className="hidden" controls>
                <source
                  src={memoizedPlayingSong ? memoizedPlayingSong.song : ""}
                  type="audio/mpeg"
                />
              </audio>

              <Slider
                ref={sliderRef}
                size="small"
                defaultValue={0}
                aria-label="Small"
                min={0}
                step={1}
                valueLabelDisplay="off"
                max={sliderVal.MAX || 100}
                value={sliderVal.VALUE}
                onChange={handleSliderChange} // Updates while sliding
                onChangeCommitted={(e, newValue) =>
                  handleSliderChange(e, newValue)
                } // Updates on slide release
                sx={{
                  color: "#be123c", // Color for the slider's track and thumb
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#be123c", // Thumb color
                    border: "1px solid white", // Optional border
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#be123c", // Track color
                    height: "3px",
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#ebe9e7", // Rail color (remaining part of the track)
                  },
                }}
              />

              <div className="flex justify-between absolute w-full -bottom-1">
                <p id="duration" className="text-[12px] text-white">
                  {formatTime(sliderVal.VALUE)}
                </p>
                <p id="duration" className="text-[12px] text-white">
                  {formatTime(sliderVal.DURATION)}
                </p>
              </div>

              {/* <input
              ref={sliderRef}
              type="range"
              min="0"
              max={sliderVal.MAX || 100}
              value={sliderVal.VALUE}
              onChange={handleSliderChange}
              className="range-slider w-full hidden"
              style={{
                background: `linear-gradient(to right, #be123c ${sliderVal.PER}%, #ebe9e7 ${sliderVal.PER}%)`,
              }}
            /> */}
            </div>

            
          </div>
          
        </div>
        <div className="flex justify-center items-center gap-2">

              {/* play controls */}
              <div className="text-gray-500 flex items-center gap-3 justify-center lg:py-5">
                <span
                  id="preSongBtn"
                  className="text-white transform rotate-180 cursor-pointer"
                  onClick={() => handlePrevBtn(memoizedPlayingSong?.songId)}
                >
                  <svg
                    className="xl:w-10 xl:h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5m11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"
                    />
                  </svg>
                </span>

                <div
                  id="iconWrapper"
                  className="cursor-pointer"
                  onClick={togglePlay}
                >
                  {/* Play/Pause Icon */}
                  <span
                    id="footerplayIcon"
                    className={`cursor-pointer text-white ${
                      isPlaying ? "block" : "hidden"
                    }`}
                  >
                    <svg
                      className="xl:w-14 xl:h-14 w-12 h-12"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M9 16h2V8H9zm4 0h2V8h-2zm-1 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                      />
                    </svg>
                  </span>

                  <span
                    id="footerpauseIcon"
                    className={`cursor-pointer text-white ${
                      isPlaying ? "hidden" : "block"
                    }`}
                  >
                    <svg
                      className="xl:w-14 xl:h-14 w-12 h-12"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                      />
                    </svg>
                  </span>
                </div>

                <span
                  className="text-white cursor-pointer"
                  id="nextSongBtn"
                  onClick={() => {
                    handleNextBtn(memoizedPlayingSong.songId);
                  }}
                >
                  <svg
                    className="xl:w-10 xl:h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5m11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"
                    />
                  </svg>
                </span>
              </div>
            </div>
      </div>
    </div>
  );
};

export default PlayingSongComp;
