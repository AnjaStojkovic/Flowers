import { useForm } from "react-hook-form";
import Input from "../userData/Input";
import SightingsService from "../../services/SightingsService";

export interface FormData {
  flower_id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  picture: File;
}

const SightingForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    create(data);
  };

  const create = (formData: FormData) => {
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
          className="form-field"
        />
        <Input
          type="text"
          placeholder="Coordinates of sighting"
          register={register("longitude")}
          className="form-field"
        />
        <Input
          type="text"
          placeholder="Coordinates of sighting"
          register={register("latitude")}
          className="form-field"
        />
        <Input
          type="file"
          register={register("picture")}
          className="form-field"
        />
      </div>

      <div className="second-row">
        <Input
          type="password"
          placeholder="Write a description.."
          register={register("description")}
          className="form-field"
        />
      </div>
      <button className="red-button">Create New Sighting</button>
    </>
  );
};

export default SightingForm;
