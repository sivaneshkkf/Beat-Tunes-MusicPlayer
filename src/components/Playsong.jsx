import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const PlayingSongComp = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0); // Track the duration of the song
  const [isPlaying, setIsPlaying] = useState(false); // Track if the song is playing
  const audioRef = useRef(null);
  const sliderRef = useRef(null);

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
    if (playingSong && !isPlaying) {
      loadSong(playingSong.song);
    }
  }, [playingSong, isPlaying]);

  // Handle audio metadata load and update slider max/duration
  useEffect(() => {
    const song = audioRef.current;
    if (song) {
      const onLoadedMetadata = () => {
        setDuration(song.duration); // Set the duration of the song
        if (sliderRef.current) {
          sliderRef.current.max = song.duration; // Set max to the audio duration
          sliderRef.current.value = song.currentTime; // Initialize the slider value
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
        setSliderValue(song.currentTime); // Update slider value with current time
        if (sliderRef.current) {
          sliderRef.current.value = song.currentTime;
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
      } else {
        audioRef.current.play(); // Play the song if it's paused
      }
      setIsPlaying(!isPlaying); // Toggle play state
    }
  };

  // Sync audio playback with slider when slider is moved manually
  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newValue; // Sync audio time with slider value
      setSliderValue(newValue); // Update slider value in state
    }
  };

  let valuePercentage = (sliderValue / sliderRef.max) * 100;


  return (
    <div className="fixed bottom-0 right-0 left-0 lg:left-auto lg:mb-5 lg:bottom-0 lg:mr-8 select-none">
      <div className="flex items-center p-2 gap-3 backdrop-blur-lg bg-white bg-opacity-5 lg:rounded-lg lg:block">
        <div
          id="playImg"
          className="overflow-hidden w-14 h-14 flex justify-center items-center rounded-full lg:w-52 lg:h-52 lg:rounded-lg xl:w-80 xl:h-72 animate-spinSlow lg:animate-none"
        >
          <img
            id="psImg"
            src={memoizedPlayingSong.img}
            alt="singer1"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="lg:space-y-1 flex items-center justify-between">
            <p id="psName" className="text-white text-sm font-semibold">
              {memoizedPlayingSong.name}
            </p>
            <p
              id="psArtist"
              className="text-gray-500 text-xs font-medium hidden"
            >
              {memoizedPlayingSong.artist}
            </p>
            <p id="duration" className="text-xs text-white">
              {memoizedPlayingSong.duration}
            </p>
          </div>

          <div>
            <audio ref={audioRef} className="hidden" controls>
              <source
                src={playingSong ? playingSong.song : ""}
                type="audio/mpeg"
              />
            </audio>
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max={duration || 100}
              value={sliderValue}
              onChange={handleSliderChange}
              className="range-slider w-full"
              style={{
                background: `linear-gradient(to right, #be123c ${valuePercentage}%, #ebe9e7 ${valuePercentage}%)`
              }}/>
          </div>
        </div>

        <div className="text-gray-500 flex items-center gap-3 justify-center lg:py-4">
          <span id="preSongBtn" className="text-white transform rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5m11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"
              />
            </svg>
          </span>

          <div id="iconWrapper" className="cursor-pointer" onClick={togglePlay}>
            {/* Play/Pause Icon */}
            <span
              id="footerplayIcon"
              className={`text-white ${isPlaying ? "block" : "hidden"}`}
            >
              <svg
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
              className={`text-white ${isPlaying ? "hidden" : "block"}`}
            >
              <svg
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

          <span className="text-white" id="nextSongBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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
  );
};

export default PlayingSongComp;
