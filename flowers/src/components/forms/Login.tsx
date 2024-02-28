import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { login } from "../../services/Auth";
import Button from "../Buttons/Button";
import Input from "../UserData/Input";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../store/user-slice";
import { closePopup } from "../../store/popup-slice";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closePopup());
  };

  const onSubmit = async (data: FormData) => {
    try {
      await schema.validate(data);
      const userId = await login(data);
      if (userId) {
        dispatch(setUserId(userId));
        closeModal();
      }
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
            className="form-field"
          />
        </label>
      </div>
      <div>
        <label>
          <Input
            type="password"
            placeholder="Password"
            register={register("password")}
            className="form-field"
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
