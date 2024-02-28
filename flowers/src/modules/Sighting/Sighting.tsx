import gradient from "../../assets/images/Gradient.png";
import flower from "../../assets/images/flower.jpg";
import com from "../../assets/images/com.svg";
import heart from "../../assets/images/heart.svg";
import fullHeart from "../../assets/images/full-heart.svg";
import MapComponent from "../../components/Map";
import SightingsService from "../../services/SightingsService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLike, postLike } from "../../store/like-slice";

interface SightingProps {
  id?: number;
  name?: string;
  description?: string;
  picture?: string;
  comments_count?: number;
  likes_count?: number;
  created_at?: Date;
  full_name?: string;
  isLiked: boolean;
}

const Sighting: React.FC<SightingProps> = ({
  id = 0,
  name,
  description,
  full_name,
  comments_count,
  likes_count,
  isLiked,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleRemoveSighting = async (id: number) => {
    try {
      await SightingsService.deleteSighting(id);
      alert("Sighting removed");
      navigate("/sightings");
    } catch (error) {
      alert("An error occured while removing sighting");
    }
  };

  const handleLikeSighting = () => {
    dispatch(postLike(id));
    window.location.reload();
  };

  const handleDeleteLike = () => {
    dispatch(deleteLike(id));
    window.location.reload();
  };

  return (
    <>
      <div className="map">
        <MapComponent />
        <div className="map__buttons">
          <button className="red-button">View on Google Maps</button>
          <button className="white-button">Report</button>
        </div>
      </div>

      <div className="sighting-box">
        <img className="sighting-box__flower" src={flower} />
        <div className="left">
          <div className="left__user-box2">
            <img className="left__user-box2__profile-pic" src={flower} />
            <div className="left__user-box2__user">
              <p className="left__user-box2__user--name">{name}</p>
              <p className="left__user-box2__user--username">by: {full_name}</p>
            </div>
          </div>
          <p className="left__text">{description}</p>
          <hr className="line" />
          <div className="reaction2">
            <div className="reaction2__comment">
              <img className="reaction2__comment__icon" src={com} />
              <p>{comments_count} Comments</p>
            </div>
            <div
              className="reaction2__heart"
              onClick={isLiked ? handleDeleteLike : handleLikeSighting}
            >
              {isLiked ? (
                <img className="reaction2__heart__icon" src={fullHeart} />
              ) : (
                <img className="reaction2__heart__icon" src={heart} />
              )}
              <p>{likes_count} Favorites</p>
            </div>
          </div>
          <div className="delete-field">
            <button
              className="red-button"
              onClick={() => handleRemoveSighting(id)}
            >
              Delete sighting
            </button>
            <Link className="red-button" to={`/edit/${id}`}>
              Edit sighting
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sighting;
