import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { login } from "../../services/Auth";
import Button from "../buttons/Button";
import Input from "../userData/Input";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await schema.validate(data);
      console.log("Valid data:", data);

      login(data);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-box">
      <h2 className="formHeading">Welcome Back</h2>
      <div>
        <label>
          <Input
            type="email"
            placeholder="Email Address"
            register={register("email")}
          />
        </label>
      </div>
      <div>
        <label>
          <Input
            type="password"
            placeholder="Password"
            register={register("password")}
          />
        </label>
      </div>
      <div>
        <Button
          text="Login to your Account"
          onClick={handleSubmit(onSubmit)}
          className="submit-button"
        />
      </div>
    </form>
  );
};

export default Login;
