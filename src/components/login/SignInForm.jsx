import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMsgContext, FormTypeContext, LoginFormOpenContext, SuccessMsgContext } from "../context/LoginContext";
import supabase from "../../Config/supabase";

const SignInForm = () => {

  const { FormType, setFormType } = useContext(FormTypeContext);
  const {successMsg, setSuccessMsg} = useContext(SuccessMsgContext);
  const {errorMsg, setErrorMsg} = useContext(ErrorMsgContext);
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormOpenContext);


  const schemaValidation = z.object({
    email: z.string().email(),
    ps: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters." }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaValidation),
  });

  const sendFormData = async (formData) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.ps,
      });

      if (error) {
        setErrorMsg(error.message)
        return console.error("Error signing in:", error.message)
      };
      if (user) {
        setSuccessMsg(true)
      }
    } catch (err) {
      setErrorMsg(err.message)
      console.error("An unexpected error occurred:", err);
    }
  };

  return (
    <div className="w-96 bg-zinc-800 p-5 text-white text-xs md:text-sm rounded-md relative">
      <h4 className="mb-5 text-center text-base">Sign in to your account</h4>

      {errorMsg && <p  className="text-red-600 w-full text-center text-xs md:text-sm py-1">{errorMsg}</p>}

      <form className="space-y-4" onSubmit={handleSubmit(sendFormData)}>
        <InputField
          label="Your email"
          id="email"
          register={register("email")}
          error={errors.email}
        />
        <InputField
          label="Password"
          id="ps"
          type="password"
          register={register("ps")}
          error={errors.ps}
        />

        <div className="space-y-2 pt-3">
          <button className="bg-accent w-full py-1 rounded">Sign in</button>
          <p className="cursor-pointer" onClick={() => {
            setFormType("signUp")
            setErrorMsg(null)
            }}>
            Don’t have an account yet?
            <span className="text-accent font-semibold ml-1">Sign up</span>
          </p>
        </div>
      </form>

      <span
        className="text-lg p-3 cursor-pointer text-primary absolute top-1 right-1"
        onClick={() => setLoginFormOpen(false)}
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
    </div>
  );
};

export default SignInForm;
