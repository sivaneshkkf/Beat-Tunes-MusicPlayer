import React, { useContext } from "react";
import supabase from "../../Config/supabase";
import { ErrorMsgContext, FormTypeContext, LoginFormOpenContext, SuccessMsgContext, UserDetailsContext } from "../context/LoginContext";

const SingOut = () => {
  const { FormType, setFormType } = useContext(FormTypeContext);
  const { successMsg, setSuccessMsg } = useContext(SuccessMsgContext);
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormOpenContext);
  const {errorMsg, setErrorMsg} = useContext(ErrorMsgContext);
  const {userDetails, setUserDetails} = useContext(UserDetailsContext);



  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMsg(error.message)
      console.error("Error signing out:", error.message)
    }else {
      setSuccessMsg(true);
      setUserDetails(null)
    }
  };

  return (
    <div className="w-96 bg-zinc-800 text-white text-xs md:text-sm rounded-md relative">
      <div className="flex flex-col items-center justify-center p-5 w-full">
        <div className="space-y-5 w-full">
          <p>Are you sure you want to sign out?</p>

          {errorMsg && <p className="text-red-600 w-full text-center text-xs md:text-sm py-1">{errorMsg}</p>}
          <div className="flex gap-2 w-full">
            <button
              className="py-2 px-2 w-full bg-red-600 text-white rounded"
              onClick={handleSignout}
            >
              Sign out
            </button>
            <button className="py-2 px-2 w-full bg-gray-500 text-white rounded"
              onClick={() => setLoginFormOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingOut;
