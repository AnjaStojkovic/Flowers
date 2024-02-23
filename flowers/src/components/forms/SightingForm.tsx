import { useForm } from "react-hook-form";
import { useEffect, useId, useState } from "react";
import Input from "../UserData/Input";
import SightingsService from "../../services/SightingsService";
import FlowersService from "../../services/FlowersService";

export interface MyFormData {
  name: string;
  description: string;
  latitude: number | string;
  longitude: number | string;
  picture: FileList;
  flower_id: number | undefined;
}

const SightingForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<MyFormData>();

  const fetchFlower = async (data: MyFormData) => {
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

  const onSubmit = async (data: MyFormData) => {
    const flower = await fetchFlower(data);

    const picture = data.picture[0];

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("latitude", String(data.latitude));
    formData.append("longitude", String(data.longitude));
    formData.append("picture", picture);
    formData.append("flower_id", flower.id);

    create(formData);
  };

  const create = (formData: FormData) => {
    SightingsService.postSighting(formData)
      .then(() => {
        alert("Successfully added");
        reset({
          name: "",
          description: "",
          latitude: "",
          longitude: "",
          picture: undefined,
          flower_id: undefined,
        });
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
          defaultValue=""
        />
        <Input
          type="text"
          placeholder="Coordinates of sighting"
          register={register("longitude")}
          className="input-field"
          defaultValue=""
        />
        <Input
          type="text"
          placeholder="Coordinates of sighting"
          register={register("latitude")}
          className="input-field"
          defaultValue=""
        />
        <label className="file-input-label">
          <Input
            type="file"
            register={register("picture")}
            className="file-input"
            accept="image/*"
            defaultValue=""
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
          defaultValue=""
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
