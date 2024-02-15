import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import UserService from "../../services/UserService";
import Button from "../buttons/Button";
import Input from "../userData/Input";
import { yupResolver } from "@hookform/resolvers/yup";

// interface FormData<T> {
//   firstName: T;
//   lastName: T;
//   email: T;
//   password: T;
//   dateOfBirth: T;
// }

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
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await schema.validate(data);
      create(data);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const create = (formData: FormData) => {
    UserService.createAccount(formData)
      .then(() => {
        alert("Successfully added");
      })
      .catch((error: Error) => {
        alert(error.message);
      });
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
          />
        </label>
        <label>
          <Input
            type="text"
            placeholder="Last name"
            register={register("last_name")}
          />
        </label>
      </div>
      <div>
        <label>
          <Input
            type="date"
            placeholder="Date of birth"
            register={register("date_of_birth")}
          />
        </label>
      </div>
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
          text="Create Account"
          onClick={handleSubmit(onSubmit)}
          className="submit-button"
        />
      </div>
    </form>
  );
};

export default CreateAccount;
