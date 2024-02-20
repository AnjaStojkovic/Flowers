import { useDispatch, useSelector } from "react-redux";
import userImg from "../../assets/images/flower.jpg";
import UserInfoItem from "./UserInfoItem";
import { closePopup } from "../../store/popup-slice";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { logout } from "../../services/Auth";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const UserInfo = () => {
  const [userData, setUserData] = useState<User>();
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.userId);

  const getFlowerData = async (userId: any) => {
    try {
      const { user } = await UserService.getUserInfo(userId);
      console.log(user);
      setUserData(user);
    } catch (error) {
      console.error("An error occurred while fetching the user data:", error);
    }
  };

  useEffect(() => {
    getFlowerData(userId);
  }, []);

  const closeUserInfoPopup = () => {
    dispatch(closePopup());
  };

  return (
    <>
      <div className="user-box">
        <img src={userImg} className="user-box__img" />
        <div className="user-box__user">
          <p className="user-box__user__name">{userData?.first_name}</p>
          <p className="user-box__user__sightings">sightings</p>
        </div>
        <button onClick={closeUserInfoPopup} className="user-box__close-button">
          ×
        </button>
      </div>
      <div className="info-details">
        <UserInfoItem label="First name" value={userData?.first_name ?? ""} />
        <UserInfoItem label="Last Name" value={userData?.last_name ?? ""} />
        <UserInfoItem label="Date of birth" value="May 20, 1989" />
        <UserInfoItem label="Email adress" value="john@gmail.com" />
        <button onClick={logout} className="info-details__logout">
          Logout
        </button>
      </div>
    </>
  );
};

export default UserInfo;
