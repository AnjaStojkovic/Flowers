import flower from "../../assets/images/flower.jpg";

interface CardProps {
  name: string;
  description: string;
  sightings: number;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({
  name,
  description,
  sightings,
  imageUrl,
}) => {
  console.log(name, description);
  return (
    <div className="card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <h1 className="card__heading">{name}</h1>
      <p className="card__description">{description}</p>
      <p className="card__sightings">Sightings: {sightings}</p>
    </div>
  );
};

export default Card;
