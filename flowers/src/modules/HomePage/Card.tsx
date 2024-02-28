import { Link } from "react-router-dom";
import StarIcon from "../../components/Svgs/Star-Icon";
import FlowersService from "../../services/FlowersService";

interface CardProps {
  id: number;
  name: string;
  description: string;
  sightings: number;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  sightings,
  imageUrl,
}) => {
  const handleFavoriteClick = async () => {
    try {
      await FlowersService.postFavoriteFlower(id);
      alert("Flower added to favorites");
    } catch (error) {
      alert("An error occured while adding flower to favorites");
    }
  };

  return (
    <Link
      className="card"
      style={{ backgroundImage: `url(${imageUrl})` }}
      key={id}
      to={`/details/${id}`}
    >
      <StarIcon className="card2__icon" onClick={handleFavoriteClick} />
      <h1 className="card__heading">{name}</h1>
      <p className="card__description">{description}</p>
      <p className="card__sightings">Sightings: {sightings}</p>
      <Link key={id} to={`/details/${id}`} />
    </Link>
  );
};

export default Card;
