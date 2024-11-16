import React, { useContext } from "react";
import supabase from "../../Config/supabase";
import {motion} from "framer-motion"
import { ErrorMsgContext, FormTypeContext, LoadingContext, LoginFormOpenContext, SuccessMsgContext, UserDetailsContext } from "../context/LoginContext";
import BtnComponent from "./BtnComponent";

const SingOut = () => {
  const { FormType, setFormType } = useContext(FormTypeContext);
  const { successMsg, setSuccessMsg } = useContext(SuccessMsgContext);
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormOpenContext);
  const {errorMsg, setErrorMsg} = useContext(ErrorMsgContext);
  const {userDetails, setUserDetails} = useContext(UserDetailsContext);
  const {isLoading, setIsLoading} = useContext(LoadingContext)




  const handleSignout = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMsg(error.message)
      setIsLoading(false)
      console.error("Error signing out:", error.message)
    }else {
      setSuccessMsg(true);
      setUserDetails(null)
      setIsLoading(false)
    }
  };

  return (
    <motion.div className="w-96 bg-zinc-800 text-white text-xs md:text-sm rounded-md relative"
    initial={{ y: 400 }}
    animate={loginFormOpen ? { y: 0 } : {y:400}}
    transition={{ duration: 0.5, type: "spring" }}
    style={{ willChange: "transform" }}
    >
      <div className="flex flex-col items-center justify-center p-5 w-full">
        <div className="space-y-5 w-full">
          <p>Are you sure you want to sign out?</p>

          {errorMsg && <p className="text-red-600 w-full text-center text-xs md:text-sm py-1">{errorMsg}</p>}
          <div className="flex gap-2 w-full">
            {/* <button
              className="py-2 px-2 w-full bg-red-600 text-white rounded"
              onClick={handleSignout}
            >
              Sign out
            </button> */}
            <BtnComponent text="Sign out" loading= {isLoading} onClick={() => handleSignout()}/>
            {/* <button className="py-2 px-2 w-full bg-gray-500 text-white rounded"
              onClick={}
            >
              Cancel
            </button> */}
          <BtnComponent text="Cancel" loading= {false} onClick={() => setLoginFormOpen(false)} className="py-2 px-2 w-full bg-gray-500 text-white rounded"/>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingOut;
