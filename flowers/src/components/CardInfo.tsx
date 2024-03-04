import flower from "../assets/images/flower.jpg";
import location from "../assets/images/location.svg";
import com from "../assets/images/com.svg";
import heart from "../assets/images/heart.svg";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: number;
  full_name: string;
}

interface CardInfoProps {
  name: string;
  id: number;
  user: User;
  description: string;
  picture: string;
  likes_count: number;
  comments_count: number;
}

const CardInfo: React.FC<CardInfoProps> = ({
  id,
  name,
  description,
  user,
  picture,
  likes_count,
  comments_count,
}) => {
  const navigate = useNavigate();

  return (
    <div className="card-info" key={id}>
      <div className="location-box">
        <p className="location-box__location">Location</p>
        <img
          className="location-box__location-svg"
          src={location}
          alt="Location"
        />
      </div>
      <div onClick={() => navigate(`/sighting/${id}`)}>
        <img className="flower-img" src={picture} alt="Flower" />
      </div>
      <div className="user-box2">
        <img className="user-box2__profile-pic" src={flower} alt="Profile" />
        <div className="user-box2__user">
          <Link to={`/sighting/${id}`} className="user-box2__user__name">
            {name}
          </Link>
          <p className="user-box2__user__username">by: {user.full_name}</p>
        </div>
      </div>
      <p className="card-text">{description}</p>
      <hr className="line" />
      <div className="reaction">
        <div className="reaction__comment">
          <img className="reaction__comment__icon" src={com} alt="Comment" />
          <p>{comments_count} Comments</p>
        </div>
        <div className="reaction__heart">
          <img className="reaction__heart__icon" src={heart} alt="Heart" />
          <p>{likes_count} Favorites</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
