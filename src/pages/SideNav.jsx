import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NavBarContext } from "../components/context/NaveBarContext";

const SideNav = () => {
  const { isNavBarOpen, setNavBarOpen } = useContext(NavBarContext);
  const [sWidth, setSWidth] = useState("sm")


  useEffect(()=> {

    function handleRezise(){
      setSWidth(getScreenWidth())
    }
    
    handleRezise();

    window.addEventListener("resize",handleRezise)

    return () => window.removeEventListener("resize", handleRezise);

  },[])

  useEffect(()=> {
    if(sWidth==="sm"){
      setNavBarOpen(false)
    }else{
      setNavBarOpen(true)
      
    }
   
  },[])


  // useEffect(() => {
  //   function handleClick(e) {
  //     console.log(sWidth,isNavBarOpen,e.target.id)
  //     // Check if navbar is open and click happened outside the navbar
  //     if (isNavBarOpen) {
       
  //         setNavBarOpen(false); // Close the navbar
        
  //     }
  //   }
  
  //   document.addEventListener("click", handleClick);
  //   return () => document.removeEventListener("click", handleClick);
  // }, []);
  
  

  function getScreenWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return "xl";
    } else if (screenWidth >= 768) {
      return "lg";
    } else if (screenWidth >= 640) {
      return "md";
    } else {
      return "sm";
    }
  }

  return (
    <motion.div
    className={`pt-3 md:static w-48 h-screen overflow-y-scroll scrollbar bg-[#212326] border-r border-[#151719] rounded-r-lg 
      ${sWidth === "sm" ? "absolute z-40" : ""}`}
      initial={{ x: -200 }}
      animate={isNavBarOpen ? { x: 0 } : { x: -200 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      aria-hidden={!isNavBarOpen}
      role="navigation"
      id="sideNav"
    >
      <ul className="px-1 text-gray-200 text-xs font-medium space-y-5 ml-5 mt-10">
        <Link to="/" className="flex gap-2 items-center"
        onClick={() => {
          sWidth === "sm" && setNavBarOpen(false)
        }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 14.85V11q0-.2.075-.375T4.3 10.3l7-7q.15-.15.325-.225Q11.8 3 12 3t.375.075q.175.075.325.225l1.425 1.4ZM17 20v-8.175L13.075 7.9L15.2 5.775l4.5 4.525q.125.15.213.325Q20 10.8 20 11v8q0 .425-.288.712Q19.425 20 19 20ZM5 20q-.425 0-.713-.288Q4 19.425 4 19v-2.05l3-3V17h8.5v3Z"
            />
          </svg>
          <p>Home</p>
        </Link>
        <li className="flex gap-2 items-center opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M2.5 7a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m0 10a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m10 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 0 0-9 0m-3-10a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m0 10a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m10 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0M16 11V8h-3V6h3V3h2v3h3v2h-3v3z"
            />
          </svg>
          <p>Generel</p>
        </li>
        <li className="flex gap-2 items-center opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.775 12q-.9 0-1.5-.675T7.8 9.75l.325-2.45q.2-1.425 1.3-2.363T12 4t2.575.938t1.3 2.362l.325 2.45q.125.9-.475 1.575t-1.5.675zm0-2h4.45L13.9 7.6q-.1-.7-.637-1.15T12 6t-1.263.45T10.1 7.6zM4 18v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6 0"
            />
          </svg>
          <p>Artist</p>
        </li>
        <li className="flex gap-2 items-center opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 17.4V2.6a.6.6 0 0 1 .6-.6h14.8a.6.6 0 0 1 .6.6v14.8a.6.6 0 0 1-.6.6H2.6a.6.6 0 0 1-.6-.6Z" />
              <path
                strokeLinecap="round"
                d="M8 22h13.4a.6.6 0 0 0 .6-.6V8m-11 4.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm0 0V6.6a.6.6 0 0 1 .6-.6H13"
              />
            </g>
          </svg>
          <p>Albums</p>
        </li>
        <Link to="/favourite" className="flex gap-2 items-center"
        onClick={() => {
          sWidth === "sm" && setNavBarOpen(false)
        }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3m-4.4 15.55l-.1.1l-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05"
            />
          </svg>
          <p>Favourites</p>
        </Link>
        <li className="flex gap-2 items-center opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 48 48"
          >
            <g fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M26 14v14"
              />
              <path
                strokeLinejoin="round"
                d="M14 28.666C14 26.64 15.934 25 18.32 25H26v4.334C26 31.36 24.066 33 21.68 33h-3.36C15.934 33 14 31.359 14 29.334z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m32 15l-6-1"
              />
            </g>
          </svg>
          <p>Recently Plays</p>
        </li>
      </ul>
      <p className="title-col text-center mt-20 mb-5">Playlist</p>
      <ul className="px-1 text-gray-200 text-xs font-medium space-y-3 ml-5 pb-20 lg:pb-0 opacity-20">
        <li className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="currentColor"
                d="M10.975 3.002a1 1 0 0 1-.754 1.196a8 8 0 1 0 8.446 3.379a1 1 0 1 1 1.666-1.107A9.96 9.96 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-4.76 3.325-8.742 7.779-9.752a1 1 0 0 1 1.196.754M13 3.014a1.01 1.01 0 0 1 1.214-.99l.115.031l2.987.996a1 1 0 0 1-.52 1.928l-.112-.03L15 4.387V12a3 3 0 1 1-2.19-2.89l.19.06V3.015Z"
              />
            </g>
          </svg>
          <p>Rock & Roll</p>
        </li>

        <li className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="currentColor"
                d="M10.975 3.002a1 1 0 0 1-.754 1.196a8 8 0 1 0 8.446 3.379a1 1 0 1 1 1.666-1.107A9.96 9.96 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-4.76 3.325-8.742 7.779-9.752a1 1 0 0 1 1.196.754M13 3.014a1.01 1.01 0 0 1 1.214-.99l.115.031l2.987.996a1 1 0 0 1-.52 1.928l-.112-.03L15 4.387V12a3 3 0 1 1-2.19-2.89l.19.06V3.015Z"
              />
            </g>
          </svg>
          <p>Best of 90's</p>
        </li>

        <li className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="currentColor"
                d="M10.975 3.002a1 1 0 0 1-.754 1.196a8 8 0 1 0 8.446 3.379a1 1 0 1 1 1.666-1.107A9.96 9.96 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-4.76 3.325-8.742 7.779-9.752a1 1 0 0 1 1.196.754M13 3.014a1.01 1.01 0 0 1 1.214-.99l.115.031l2.987.996a1 1 0 0 1-.52 1.928l-.112-.03L15 4.387V12a3 3 0 1 1-2.19-2.89l.19.06V3.015Z"
              />
            </g>
          </svg>
          <p>Work Time</p>
        </li>
        <li className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path
                fill="currentColor"
                d="M10.975 3.002a1 1 0 0 1-.754 1.196a8 8 0 1 0 8.446 3.379a1 1 0 1 1 1.666-1.107A9.96 9.96 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-4.76 3.325-8.742 7.779-9.752a1 1 0 0 1 1.196.754M13 3.014a1.01 1.01 0 0 1 1.214-.99l.115.031l2.987.996a1 1 0 0 1-.52 1.928l-.112-.03L15 4.387V12a3 3 0 1 1-2.19-2.89l.19.06V3.015Z"
              />
            </g>
          </svg>
          <p>Sleep Mode</p>
          <span
            className="text-lg p-3 cursor-pointer text-gray-300 absolute top-1 right-1 sm:hidden"
            onClick={() => setNavBarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"
              ></path>
            </svg>
          </span>
        </li>
      </ul>
    </motion.div>
  );
};

export default SideNav;
