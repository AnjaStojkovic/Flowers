import { Link } from "react-router-dom";
import flower from "../../assets/images/flower.jpg";

interface FavoriteProps {
  name: string;
  latinName: string;
  sightings: number;
  profilePicture: string;
}

const Favorite: React.FC<FavoriteProps> = ({
  name,
  latinName,
  sightings,
  profilePicture,
}) => {
  return (
    <div className="card">
      <Link to="/" style={{ backgroundImage: `url(${profilePicture})` }}>
        <h1 className="card__heading">{name}</h1>
        <p className="card__description">{latinName}</p>
        <p className="card__sightings">Sightings: {sightings}</p>
      </Link>
    </div>
  );
};

export default Favorite;
