import { useDispatch, useSelector } from "react-redux";
import userImg from "../../assets/images/flower.jpg";
import UserInfoItem from "./UserInfoItem";
import { closePopup } from "../../store/popup-slice";

const UserInfo = () => {
  //const { isOpen, type } = useSelector((state: RootState) => state.popup);
  const dispatch = useDispatch();

  const closeUserInfoPopup = () => {
    dispatch(closePopup());
  };

  return (
    <>
      <div className="user-box">
        <img src={userImg} className="user-box__img" />
        <div className="user-box__user">
          <p className="user-box__user__name">Name LastName</p>
          <p className="user-box__user__sightings">sightings</p>
        </div>
        <button onClick={closeUserInfoPopup} className="user-box__close-button">
          ×
        </button>
      </div>
      <div className="info-details">
        <UserInfoItem label="First name" value="John" />
        <UserInfoItem label="Last Name" value="Doe" />
        <UserInfoItem label="Date of birth" value="May 20, 1989" />
        <UserInfoItem label="Email adress" value="john@gmail.com" />
        <button className="info-details__logout">Logout</button>
      </div>
    </>
  );
};

export default UserInfo;
