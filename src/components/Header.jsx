import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      navigate(`/search/:${searchInput}`);
    } else {
      navigate("/");
    }
  }, [searchInput]);

  return (
    <header className="space-y-2 px-5 md:px-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <h3 className="text-white font-semibold text-xl sm:text-3xl">
            Beat<span className="text-rose-500 font-bold">Tunes</span>
          </h3>

          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 56 56"
              className="text-rose-500"
            >
              <path
                fill="currentColor"
                d="M5.523 41.242H6.79c.375 0 .586-.234.586-.586V27.438c0-11.11 8.39-18.329 20.625-18.329c12.258 0 20.625 7.22 20.625 18.329v13.218c0 .352.211.586.586.586h1.266c1.03 0 1.757-.656 1.757-1.617V26.57c0-12.445-9.82-21.093-23.437-21.093h-1.594c-13.617 0-23.437 8.648-23.437 21.093v13.055c0 .96.75 1.617 1.757 1.617m6.75 9.281h2.204c2.882 0 4.5-1.523 4.5-4.218V36.18c0-2.696-1.618-4.22-4.5-4.22h-2.204c-1.57 0-2.437.845-2.437 2.392v13.78c0 1.571.867 2.391 2.437 2.391m29.274 0h2.203c1.594 0 2.484-.82 2.484-2.39V34.352c0-1.547-.89-2.391-2.484-2.391h-2.203c-2.86 0-4.477 1.523-4.477 4.219v10.125c0 2.695 1.617 4.218 4.477 4.218"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 56 56"
              className="text-rose-500 animate-ping absolute opacity-75"
            >
              <path
                fill="currentColor"
                d="M5.523 41.242H6.79c.375 0 .586-.234.586-.586V27.438c0-11.11 8.39-18.329 20.625-18.329c12.258 0 20.625 7.22 20.625 18.329v13.218c0 .352.211.586.586.586h1.266c1.03 0 1.757-.656 1.757-1.617V26.57c0-12.445-9.82-21.093-23.437-21.093h-1.594c-13.617 0-23.437 8.648-23.437 21.093v13.055c0 .96.75 1.617 1.757 1.617m6.75 9.281h2.204c2.882 0 4.5-1.523 4.5-4.218V36.18c0-2.696-1.618-4.22-4.5-4.22h-2.204c-1.57 0-2.437.845-2.437 2.392v13.78c0 1.571.867 2.391 2.437 2.391m29.274 0h2.203c1.594 0 2.484-.82 2.484-2.39V34.352c0-1.547-.89-2.391-2.484-2.391h-2.203c-2.86 0-4.477 1.523-4.477 4.219v10.125c0 2.695 1.617 4.218 4.477 4.218"
              />
            </svg>
          </div>
        </div>
        <div className=" text-txtcolor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-2 lg:absolute lg:top-1 lg:right-20">
        <div className="flex items-center relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="text-gray-400 absolute ml-2"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            />
          </svg>
          <input
            type="search"
            placeholder="Search"
            className="bg-gradient-to-r from-[#212735] to-[#151719] rounded-lg pl-8 pr-4 py-2 border-none outline-none focus:ring-1 focus:ring-zinc-800 w-full ring-1 ring-zinc-700 text-white text-sm"
            value={searchInput}
            onChange={handleOnchange}
          />
        </div>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
            className="text-white"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                d="M11 16v26m13-13v13m0-23V6m13 0v26"
              />
              <path d="M11 16a5 5 0 1 0 0-10a5 5 0 0 0 0 10Zm13 13a5 5 0 1 0 0-10a5 5 0 0 0 0 10Zm13 13a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" />
            </g>
          </svg>
        </span>
      </div>
    </header>
  );
}

export default Header;
