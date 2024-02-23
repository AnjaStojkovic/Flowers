import star from "../../assets/images/star-circle.svg";
import flower from "../../assets/images/pink-flower.png";
import { useNavigate } from "react-router-dom";

interface FlowerDetailsProps {
  name: string;
  latin_name: string;
  sightings: number;
}

const BackgroundDetails: React.FC<FlowerDetailsProps> = ({
  name,
  latin_name,
  sightings,
}) => {
  const navigate = useNavigate();

  return (
    <div className="detailsContainer">
      <div className="sightings-container">
        <img className="star-circle" src={star} alt="star" />
        <span className="sightings-box">Sightings: {sightings} </span>
      </div>
      <p className="name">{name}</p>
      <div className="add-sighting-container">
        <span className="latinName">{latin_name}</span>
        <button onClick={() => navigate("/create")} className="add-sighting">
          +Add New Sighting
        </button>
      </div>
      <img className="flower" src={flower} alt="flower" />
      {/* <img className="flower" src={profile_picture} alt="flower" /> */}
    </div>
  );
};

export default BackgroundDetails;
