import StarIcon from "../../components/Svgs/Star-Icon";
import FlowersService from "../../services/FlowersService";

interface FavoriteProps {
  id: number;
  flowerId: number;
  name: string;
  latinName: string;
  sightings: number;
  profilePicture: string;
  onRemove: (id: number, flowerId: number) => void;
}

const Favorite: React.FC<FavoriteProps> = ({
  id,
  flowerId,
  name,
  latinName,
  sightings,
  profilePicture,
  onRemove,
}) => {
  const handleRemoveClick = () => {
    onRemove(flowerId, id);
  };

  return (
    <div
      className="card2"
      style={{ backgroundImage: `url(${profilePicture})` }}
    >
      <div>
        <StarIcon className="card2__icon" onClick={handleRemoveClick} />
        <h1 className="card2__heading">{name}</h1>
        <p className="card2__description">{latinName}</p>
        <p className="card2__sightings">Sightings: {sightings}</p>
      </div>
    </div>
  );
};

export default Favorite;
