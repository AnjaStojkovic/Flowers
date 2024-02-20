import StarIcon from "../../components/svgs/Star-Icon";

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
    <div
      className="card2"
      style={{ backgroundImage: `url(${profilePicture})` }}
    >
      <div>
        <StarIcon className="card2__icon" />
        <h1 className="card2__heading">{name}</h1>
        <p className="card2__description">{latinName}</p>
        <p className="card2__sightings">Sightings: {sightings}</p>
      </div>
    </div>
  );
};

export default Favorite;
