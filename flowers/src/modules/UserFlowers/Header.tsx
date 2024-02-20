import { useEffect, useState } from "react";
import flower from "../../assets/images/flower.jpg";
import { isAuthenticated } from "../../services/Auth";
import UserService from "../../services/UserService";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const Header: React.FC<{}> = () => {
  const [userData, setUserData] = useState<User | undefined>();

  const getUserData = async () => {
    try {
      const { user } = await UserService.getUserInfo();
      console.log(user);
      setUserData(user);
    } catch (error) {
      console.error("An error occurred while fetching the user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
      <button className="report-button">Report</button>
    </div>
  );
};

export default Header;
