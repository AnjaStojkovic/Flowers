import star from "../../assets/images/star-circle.svg";
import flower from "../../assets/images/pink-flower.png";

interface FlowerDetailsProps {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
  favorite: boolean;
  features: string[];
  description: string;
}

const BackgroundDetails: React.FC<FlowerDetailsProps> = ({
  id,
  name,
  latin_name,
  sightings,
  profile_picture,
  favorite,
  features,
  description,
}) => {
  return (
    <div className="detailsContainer">
      <div className="sightings-container">
        <img className="star-circle" src={star} alt="star" />
        <span className="sightings-box">Sightings: {sightings} </span>
      </div>
      <p className="name">{name}</p>
      <div className="add-sighting-container">
        <span className="latinName">{latin_name}</span>
        <button className="add-sighting">+Add New Sighting</button>
      </div>
      <img className="flower" src={flower} alt="flower" />
      {/* <img className="flower" src={profile_picture} alt="flower" /> */}
    </div>
  );
};

export default BackgroundDetails;
