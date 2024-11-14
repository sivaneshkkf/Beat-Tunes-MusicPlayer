import React, { useContext } from "react";
import {
  FormTypeContext,
  LoginFormOpenContext,
  SuccessMsgContext,
} from "../context/LoginContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SuccessMsg = ({ formType }) => {
  const { FormType, setFormType } = useContext(FormTypeContext);
  const { successMsg, setSuccessMsg } = useContext(SuccessMsgContext);

  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormOpenContext);

  const ShowMsg = () => {
    setTimeout(() => {
      setLoginFormOpen(false);
      setSuccessMsg(false);
      if (formType === "signIn") {
        setFormType("signOut");
      } else if (formType === "signUp") {
        setFormType("signOut");
      } else {
        setFormType("signIn");
      }
    }, 3000);

    console.log(formType)

    return (
      <p>
        {formType === "signIn"
          ? "Sign in successfully"
          : formType === "signUp"
          ? "Sign up successfully"
          : "Sign out successfully"}
      </p>
    );
  };

  return (
    <div>
      <div className="w-96 bg-zinc-800 p-5 text-white text-xs md:text-sm rounded-md relative">
        <div className="flex flex-col items-center justify-center p-10">
          <CheckCircleOutlineIcon
            sx={{ fontSize: 50, color: "green", margin: "8px" }}
          />

          <ShowMsg/>
        </div>
      </div>
    </div>
  );
};

export default SuccessMsg;
