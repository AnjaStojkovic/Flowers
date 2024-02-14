import React from 'react';

interface EmailPasswordInputProps {
  type: 'email' | 'password';
  placeholder: string;
  register: any; // menjacu
}

const EmailPasswordInput: React.FC<EmailPasswordInputProps> = ({ type, placeholder, register }) => {
  return (
    <input
      type={type}
      className="form-field"
      {...register}
      placeholder={placeholder}
    />
  );
}

export default EmailPasswordInput;