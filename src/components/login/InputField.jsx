import React from "react";

const InputField = ({ label, id, type = "text", register, error }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        className="px-2 py-1 w-full mt-1 rounded bg-zinc-700 outline-none"
        {...register}
      />
      {error && (
        <span className="text-xs text-red-600">{error.message}</span>
      )}
    </div>
  );
};

export default InputField;
