import { useEffect, useState } from "react";
import flower from "../../assets/images/flower.jpg";
import { isAuthenticated } from "../../services/Auth";
import UserService from "../../services/UserService";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface Props {
  userData: User | undefined;
}

const Header: React.FC<Props> = ({ userData }) => {
  return (
    <div className="header-box">
      {isAuthenticated() ? (
        <div className="user-box3">
          <img className="user-box3__profile-pic" src={flower} alt="Profile" />
          <div className="user-box3__user">
            {userData ? (
              <>
                <p className="user-box3__user__name">
                  {userData.first_name} {userData.last_name}
                </p>
                <p className="user-box3__user__sightings">32 sightings</p>
              </>
            ) : (
              <>Loading...</>
            )}
          </div>
        </div>
      ) : (
        <p>No user found</p>
      )}
      <button className="red-button">Report</button>
    </div>
  );
};

export default Header;
