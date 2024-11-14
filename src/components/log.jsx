import React, { useContext, useState } from "react";
import { LoginFormOpenContext, SignUpUserStatus } from "./context/LoginContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "../Config/supabase";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { div } from "framer-motion/client";

const LoginForm = () => {
  const { loginFormOpen, setLoginFormOpen } = useContext(LoginFormOpenContext);
  const { isSignedIn, setIsSignedIn } = useContext(SignUpUserStatus);

  const [isSignup, setIsSignup] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);

  const [signType, setSignType] = useState(null);

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

  const handleCloseForm = () => {
    setLoginFormOpen(false);
    setShowSuccessMsg(false);
    setIsSignedOut(false);
  };

  const sendFormData = async (formData) => {
    try {
      if (isSignup) {
        const { user, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.ps,
        });

        if (error) return console.error("Error signing up:", error.message);
        if (user) handleSuccess(true);
      } else {
        const {
          data: { user },
          error,
        } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.ps,
        });

        if (error) return console.error("Error signing in:", error.message);
        if (user) {
          handleSuccess();
          signInFormclose();
        }
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  };

  const handleSuccess = (signup = false) => {
    setShowSuccessMsg(true);
    setTimeout(() => handleCloseForm(), 3000);
  };

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
    else {
      setIsSignedOut(true);
      handleSuccess();
    }
  };

  const signInFormclose = () => {
    setTimeout(() => {
      isSignedIn(true);
      setShowSuccessMsg(false);
    }, 3000);
  };

  return (
    <div
      className={`fixed inset-0 h-screen bg-white bg-opacity-30 w-full flex justify-center items-center ${
        loginFormOpen ? "block" : "hidden"
      }`}
    >
       {!isSignedIn ? (
      <div className="w-96 bg-zinc-800 p-5 text-white text-xs md:text-sm rounded-md relative">
       
          <div>
            <h4 className="mb-5 text-center text-base">
              {isSignup ? "Sign up" : "Sign in to your account"}
            </h4>

            {!showSuccessMsg ? (
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
                <AuthButtons
                  isSignup={isSignup}
                  onToggle={() => setIsSignup(!isSignup)}
                />
              </form>
            ) : (
              <SuccessMessage
                message={
                  isSignup ? "Sign up successfully" : "Sign in successfully"
                }
              />
            )}
          </div>
        

        <CloseButton onClick={handleCloseForm} />
      </div>
      ) : (
        <SignOutConfirmation
          isSignedOut={isSignedOut}
          onConfirm={handleSignout}
          onCancel={handleCloseForm}
          showSuccessMsg={showSuccessMsg}
        />
      )}
    </div>
  );
};

// Reusable input field component
const InputField = ({ label, id, type = "text", register, error }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      className="px-2 py-1 w-full mt-1 rounded bg-zinc-700 outline-none"
      {...register}
    />
    {error && (
      <span className="text-xs text-red-600">This field is required</span>
    )}
  </div>
);

// Reusable button section for signing in/up
const AuthButtons = ({ isSignup, onToggle }) => (
  <div className="space-y-2 pt-3">
    <button className="bg-accent w-full py-1 rounded">
      {isSignup ? "Sign up" : "Sign in"}
    </button>
    <p className="cursor-pointer" onClick={onToggle}>
      {isSignup ? "Already have an account?" : "Don’t have an account yet?"}
      <span className="text-accent font-semibold ml-1">
        {isSignup ? "Sign in" : "Sign up"}
      </span>
    </p>
  </div>
);

// Success message display
const SuccessMessage = ({ message }) => (
  <div className="w-96 bg-zinc-800 p-5 text-white text-xs md:text-sm rounded-md relative">
    <div className="flex flex-col items-center justify-center p-10">
      <CheckCircleOutlineIcon
        sx={{ fontSize: 50, color: "green", margin: "8px" }}
      />
      <p>{message}</p>
    </div>
  </div>
);

// Sign-out confirmation section
const SignOutConfirmation = ({ showSuccessMsg, onConfirm, onCancel }) => (
  <div className="flex flex-col items-center justify-center p-10">
    {showSuccessMsg ? (
      <SuccessMessage message="Sign out successfully" />
    ) : (
      <div className="space-y-5">
        <p>Are you sure you want to sign out?</p>
        <div className="flex gap-2">
          <button
            className="py-1 px-2 w-full bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Sign out
          </button>
          <button
            className="py-1 px-2 w-full bg-gray-500 text-white rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
);

// Close button in top-right corner
const CloseButton = ({ onClick }) => (
  <span
    className="text-lg p-3 cursor-pointer text-primary absolute top-1 right-1"
    onClick={onClick}
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
);

export default LoginForm;
