import React from "react";

interface InputProps {
  type: "text" | "email" | "date" | "email" | "password";
  placeholder: string;
  register: any; // menjacu
}

const Input: React.FC<InputProps> = ({ type, placeholder, register }) => {
  return (
    <input
      type={type}
      className="form-field"
      {...register}
      placeholder={placeholder}
    />
  );
};

export default Input;
