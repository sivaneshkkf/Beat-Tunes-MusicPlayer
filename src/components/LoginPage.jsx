import React, { useContext } from "react";
import SignInForm from "./login/SignInForm";
import {
  FormTypeContext,
  LoginFormOpenContext,
  SuccessMsgContext,
} from "./context/LoginContext";
import SingUpForm from "./login/SingUpForm";
import SingOut from "./login/SingOut";
import SuccessMsg from "./login/SuccessMsg";

const LoginPage = () => {
  const { FormType, setFormType } = useContext(FormTypeContext);
  const { successMsg, setSuccessMsg } = useContext(SuccessMsgContext);

  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormOpenContext);

  return (
    <div
      className={`fixed inset-0 h-screen bg-white bg-opacity-30 w-full flex justify-center items-center ${
        loginFormOpen ? "block" : "hidden"
      }`}
    >
      {!successMsg ? (
        <div>
          {FormType === "signIn" ? (
            <SignInForm />
          ) : FormType === "signUp" ? (
            <SingUpForm />
          ) : (
            <SingOut />
          )}
        </div>
      ) : (
        <SuccessMsg formType={FormType} />
      )}

    </div>
  );
};

export default LoginPage;
