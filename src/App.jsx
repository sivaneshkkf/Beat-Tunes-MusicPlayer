import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongs,
  addUserDetails,
  getUserLikedSongs,
  playSong,
  popularSongs,
  searchList,
  topPlayedSongs,
} from "./Redux/slices/SongSlice";
import { Songs } from "./data/songs/data";
import PlayingSongComp from "./components/Playsong";
import { IsplayingContext } from "./components/Context";
import SideNav from "./pages/SideNav";
import supabase from "./Config/supabase";
import {
  ErrorMsgContext,
  FormTypeContext,
  LoginFormOpenContext,
  SignUpUserStatus,
  SuccessMsgContext,
  UserDetailsContext,
} from "./components/context/LoginContext";
import LoginPage from "./components/LoginPage";

const App = () => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [FormType, setFormType] = useState("signIn");
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const userSongs = useSelector((state) => state.songs.userLikedSongs);

  // Dispatch actions on mount (only once)
  useEffect(() => {
    dispatch(addSongs(Songs));
    dispatch(popularSongs("popular"));
    dispatch(topPlayedSongs("topPlayed"));
    dispatch(playSong(1));
  }, [dispatch]);

  // Fetch user data from Supabase once on mount
  useEffect(() => {
    async function getUser() {
      const { data: currentUser, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error retrieving user:", userError.message);
        return;
      }
      let metadata = currentUser.user.user_metadata;
      setUserDetails(metadata); // Set user details once
      setIsSignedIn(true);
      setFormType("signOut");
    }
    getUser();
  }, []); // Empty dependency ensures it runs only once when the component mounts

  // Fetch user songs after user details are set
  useEffect(() => {
    if (userDetails?.sub) { // Check if userDetails are set before fetching songs
      async function getUserSongs(id) {
        try {
          const { data, error } = await supabase
            .from("likedSongs") // Replace with your actual table name
            .select("*")
            .eq("user_id", id);

          if (error) {
            console.error("Error fetching data:", error.message);
            return null;
          }

          //dispatch(getUserLikedSongs(data))
        } catch (err) {
          console.error("Unexpected error fetching data:", err.message);
          return null;
        }
      }

      dispatch(addUserDetails(userDetails))
      getUserSongs(userDetails.sub);
    }
  }, [userDetails]); // Fetch user songs only when userDetails is set

  console.log(userSongs);
  console.log(userDetails?.sub);

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <SignUpUserStatus.Provider value={{ isSignedIn, setIsSignedIn }}>
        <LoginFormOpenContext.Provider value={{ loginFormOpen, setLoginFormOpen }}>
          <IsplayingContext.Provider value={{ isPlaying, setIsPlaying }}>
            <div className="h-full flex overflow-hidden bg-gradient-to-br from-primary via-middle to-secondary bg-cover bg-no-repeat">
              <SideNav />
              <div className="w-full h-screen">
                <Header />
                <div className="overflow-y-auto h-full scrollbar-hidden">
                  <Outlet />
                </div>
                <PlayingSongComp />
              </div>
              <ErrorMsgContext.Provider value={{ errorMsg, setErrorMsg }}>
                <SuccessMsgContext.Provider value={{ successMsg, setSuccessMsg }}>
                  <FormTypeContext.Provider value={{ FormType, setFormType }}>
                    <LoginPage />
                  </FormTypeContext.Provider>
                </SuccessMsgContext.Provider>
              </ErrorMsgContext.Provider>
            </div>
          </IsplayingContext.Provider>
        </LoginFormOpenContext.Provider>
      </SignUpUserStatus.Provider>
    </UserDetailsContext.Provider>
  );
};

export default App;
