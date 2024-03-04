import { useDispatch, useSelector } from "react-redux";
import userImg from "../../assets/images/flower.jpg";
import UserInfoItem from "./UserInfoItem";
import { closePopup } from "../../store/popup-slice";
import { useEffect } from "react";
import { logout } from "../../services/Auth";
import { RootState } from "../../store/store";
import { fetchUserData } from "../../store/user-slice";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const UserInfo = () => {
  const dispatch = useDispatch<any>();
  const userId = useSelector((state: any) => state.user.userId);
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const closeUserInfoPopup = () => {
    dispatch(closePopup());
  };

  const handleLogout = () => {
    logout();
    closeUserInfoPopup();
  };

  return (
    <>
      <div className="user-box">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <img src={userImg} className="user-box__img" />
        <div className="user-box__user">
          <p className="user-box__user__name">{user?.first_name}</p>
          <p className="user-box__user__sightings">sightings</p>
        </div>
        <button onClick={closeUserInfoPopup} className="user-box__close-button">
          ×
        </button>
      </div>
      <div className="info-details">
        <UserInfoItem label="First name" value={user?.first_name ?? ""} />
        <UserInfoItem label="Last Name" value={user?.last_name ?? ""} />
        <UserInfoItem label="Date of birth" value="May 20, 1989" />
        <UserInfoItem label="Email adress" value="john@gmail.com" />
        <button onClick={handleLogout} className="info-details__logout">
          Logout
        </button>
      </div>
    </>
  );
};

export default UserInfo;
