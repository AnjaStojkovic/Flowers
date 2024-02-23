import React from "react";

interface InputProps {
  type: "text" | "email" | "date" | "email" | "password" | "file";
  register: any; // menjacu
  className: "input-box" | "form-field" | "input-field" | "file-input";
  placeholder?: string;
  accept?: string;
  defaultValue?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  register,
  className,
  accept,
  defaultValue,
}) => {
  return (
    <input
      type={type}
      {...register}
      placeholder={placeholder}
      className={className}
      accept={accept}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
