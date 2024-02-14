import { StringifyOptions } from 'querystring';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { text } from 'stream/consumers';
import Button from '../buttons/Button';
import EmailPasswordInput from '../userData/EmailPasswordInput';

// interface FormData<T> {
//   firstName: T;
//   lastName: T;
//   email: T;
//   password: T;
//   dateOfBirth: T; 
// }

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   dateOfBirth: string; 
// }

interface FormData {
  first_name: any;
  last_name: any;
  email: any;
  password: any;
  date_of_birth: any; 
}

// const schema = yup.object().shape({
//   firstName: yup.string().required(),
//   lastName: yup.string().required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(6).required(),
//   dateOfBirth: yup.date().required()
// });

const CreateAccount = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => { 
    try {
     // await schema.validate(data);
      console.log('Valid data:', data);
      
     create(data);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const create = (formData: any) => {
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
      <h2 className='createAccountHeading'>Create Account</h2>
      <div>
        <label>
          <input
            type="text"
            className="form-name"
            {...register('first_name')}
            placeholder="First Name"
          />
        </label>
        <label>
          <input
            type="text"
            className="form-name"
            {...register('last_name')}
            placeholder="Last Name"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="date"
            className="form-field"
            {...register('date_of_birth')}
          />
        </label>
      </div>
      <div>
        <label>
          <EmailPasswordInput
            type="email"
            placeholder="Email Address"
            register={register('email')}
          />
        </label>
      </div>
      <div>
        <label>
        <EmailPasswordInput
            type="password"
            placeholder="Password"
            register={register('password')}
          />
        </label>
      </div>
      <div>
        <Button text="Create Account" onClick={handleSubmit(onSubmit)} className='submit-button' />
      </div>
    </form>
  );
}

export default CreateAccount;
