import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import UserService from "../../services/UserService";
import Button from "../Buttons/Button";
import Input from "../UserData/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { closePopup } from "../../store/popup-slice";
import { addUser } from "../../store/user-slice";

export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: Date;
}

const schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  date_of_birth: yup.date().required(),
});

const CreateAccount = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<any>();

  const closeModal = () => {
    dispatch(closePopup());
  };

  const onSubmit = async (data: FormData) => {
    handleAddUser(data);
  };

  const handleAddUser = (formData: FormData) => {
    dispatch(addUser(formData));
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      date_of_birth: undefined,
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="formHeading">Create Account</h2>
      <div>
        <label>
          <Input
            type="text"
            placeholder="First name"
            register={register("first_name")}
            className="form-field"
          />
        </label>
        <label>
          <Input
            type="text"
            placeholder="Last name"
            register={register("last_name")}
            className="form-field"
          />
        </label>
      </div>
      <div>
        <label>
          <Input
            type="date"
            placeholder="Date of birth"
            register={register("date_of_birth")}
            className="form-field"
          />
        </label>
      </div>
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
          text="Create Account"
          onClick={handleSubmit(onSubmit)}
          className="submit-button"
        />
      </div>
    </form>
  );
};

export default CreateAccount;
