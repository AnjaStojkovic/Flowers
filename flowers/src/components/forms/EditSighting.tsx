import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import UserService from "../../services/UserService";
import Button from "../Buttons/Button";
import Input from "../UserData/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { closePopup } from "../../store/popup-slice";
import SightingsService from "../../services/SightingsService";
import { useParams } from "react-router-dom";

export interface Flower {
  id: number;
}

export interface MyFormData {
  flower: Flower;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const schema = yup.object().shape({
  flower: yup.object().shape({
    id: yup.number().required(),
  }),
  name: yup.string().required(),
  description: yup.string().required(),
  longitude: yup.number().required(),
  latitude: yup.number().required(),
});

const EditSighting: React.FC = () => {
  const [sightingData, setSightingData] = useState<MyFormData>();
  const { sightingId } = useParams();
  const { register, handleSubmit } = useForm<MyFormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const getSightingData = async (sightingId: any) => {
    try {
      const { sighting } = await SightingsService.getOneSighting(sightingId);
      setSightingData(sighting);
    } catch (error) {
      console.error("An error occurred while fetching the sighting:", error);
    }
  };

  useEffect(() => {
    getSightingData(sightingId);
  }, [sightingId]);

  const closeModal = () => {
    dispatch(closePopup());
  };

  const onSubmit = async (data: MyFormData) => {
    try {
      await schema.validate(data);
      edit(data);
      closeModal();
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const edit = (formData: MyFormData) => {
    const { flower, name, description, longitude, latitude } = formData;
    SightingsService.editSighting(
      { flower, name, description, longitude, latitude },
      !sightingId ? 0 : +sightingId
    )
      .then(() => {
        alert("Successfully edited");
        closeModal();
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
      <h2 className="edit-form__heading">Edit Sighting</h2>
      <div>
        <label>
          <Input
            type="number"
            placeholder="Flower id"
            register={register("flower.id")}
            className="form-field"
          />
        </label>
        <label>
          <Input
            type="text"
            placeholder="Name"
            register={register("name")}
            className="form-field"
          />
        </label>
      </div>
      <div>
        <label>
          <Input
            type="text"
            placeholder="Description"
            register={register("description")}
            className="form-field"
          />
        </label>
      </div>
      <div>
        <label>
          <Input
            type="number"
            placeholder="Longitude"
            register={register("longitude")}
            className="form-field"
          />
        </label>
        <label>
          <Input
            type="number"
            placeholder="Latitude"
            register={register("latitude")}
            className="form-field"
          />
        </label>
      </div>
      <div>
        <Button
          text="Edit"
          onClick={handleSubmit(onSubmit)}
          className="submit-button"
        />
      </div>
    </form>
  );
};

export default EditSighting;
