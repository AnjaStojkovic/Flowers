import flower from "../../assets/images/flower.jpg";
import location from "../../assets/images/location.svg";
import com from "../../assets/images/com.svg";
import heart from "../../assets/images/heart.svg";

interface CardInfoProps {
  name: string;
  id: number;
  user: { full_name: string };
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
  return (
    <div className="card-info">
      <div className="location-box">
        <p className="location-box__location">Location</p>
        <img className="location-box__location-svg" src={location} />
      </div>
      <img className="flower-img" src={flower} />
      <div className="user-box2">
        <img className="user-box2__profile-pic" src={flower} />
        <div className="user-box2__user">
          <p className="user-box2__user__name">{name}</p>
          <p className="user-box2__user__username">by: {user.full_name}</p>
        </div>
      </div>
      <p className="card-text">{description}</p>
      <hr className="line" />
      <div className="reaction">
        <div className="reaction__comment">
          <img className="reaction__comment__icon" src={com} />
          <p>{comments_count} Comments</p>
        </div>
        <div className="reaction__heart">
          <img className="reaction__heart__icon" src={heart} />
          <p>{likes_count} Favorites</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
