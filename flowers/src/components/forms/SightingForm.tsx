import { useForm } from "react-hook-form";
import { useEffect, useId, useState } from "react";
import Input from "../userData/Input";
import SightingsService from "../../services/SightingsService";
import FlowersService from "../../services/FlowersService";

export interface FormData {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  picture: any;
}

interface SubmitData extends FormData {
  flower_id: number | undefined;
  picture: any;
}

const SightingForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const fetchFlower = async (data: FormData) => {
    try {
      const response = await FlowersService.getSearchedFlowers(data.name);
      const flower = response.flowers[0];
      if (flower) {
        return flower;
      }
      return null;
    } catch (error) {
      alert("Erorr...");
    }
  };

  const onSubmit = async (data: FormData) => {
    const flower = await fetchFlower(data);

    const picture = data.picture[0];

    create({ flower_id: flower.id, ...data, picture });
  };

  const create = (formData: SubmitData) => {
    SightingsService.postSighting(formData)
      .then(() => {
        alert("Successfully added");
        reset();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <div className="first-row">
        <Input
          type="text"
          placeholder="Title of sighting"
          register={register("name")}
          className="input-field"
        />
        <Input
          type="text"
          placeholder="Coordinates of sighting"
          register={register("longitude")}
          className="input-field"
        />
        <Input
          type="text"
          placeholder="Coordinates of sighting"
          register={register("latitude")}
          className="input-field"
        />
        {/* <Input
          type="file"
          register={register("picture")}
          className="input-field"
        /> */}
        <label className="file-input-label">
          <Input
            type="file"
            register={register("picture")}
            className="file-input"
            accept="image/*"
          />
          <span className="file-input-text">Add a Photo</span>
        </label>
      </div>

      <div className="second-row">
        <Input
          type="text"
          placeholder="Write a description.."
          register={register("description")}
          className="input-box"
        />
      </div>
      <div className="submit-btn">
        <button onClick={handleSubmit(onSubmit)} className="red-button">
          Create New Sighting
        </button>
      </div>
    </>
  );
};

export default SightingForm;
