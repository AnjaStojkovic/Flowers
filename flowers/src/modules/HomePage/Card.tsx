import { Link } from "react-router-dom";
import flower from "../../assets/images/flower.jpg";

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
  return (
    <Link
      className="card"
      style={{ backgroundImage: `url(${imageUrl})` }}
      key={id}
      to={`/details/${id}`}
    >
      <h1 className="card__heading">{name}</h1>
      <p className="card__description">{description}</p>
      <p className="card__sightings">Sightings: {sightings}</p>
      <Link key={id} to={`/details/${id}`} />
    </Link>
  );
};

export default Card;
