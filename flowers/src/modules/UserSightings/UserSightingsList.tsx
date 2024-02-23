import { useEffect, useState } from "react";
import CardInfo from "../../components/CardInfo";
import Header from "../UserSightings/Header";
import UserService from "../../services/UserService";

interface User {
  id: number;
  full_name: string;
}

interface UserSecond {
  id: number;
  first_name: string;
  last_name: string;
}

interface Card {
  name: string;
  id: number;
  full_name: string;
  user: User;
  description: string;
  picture: string;
  likes_count: number;
  comments_count: number;
}

const UserSightingsList: React.FC = () => {
  const [sightingsData, setSightingsData] = useState<Card[]>([]);
  const [userData, setUserData] = useState<UserSecond | undefined>();
  console.log("USER DATA:", userData);

  const getUserData = async () => {
    try {
      const { user } = await UserService.getUserInfo();
      console.log(user);
      setUserData(user);
    } catch (error) {
      console.error("An error occurred while fetching the user data:", error);
    }
  };

  const getUserSightingsData = async (userId: number | undefined) => {
    try {
      const userId = userData?.id;
      const response = await UserService.getUserSightings(userId);
      const { sightings } = response;
      setSightingsData(sightings);
    } catch (error) {
      console.error("An error occurred while fetching sightings:", error);
      setSightingsData([]);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData?.id) {
      getUserSightingsData(userData.id);
    }
  }, [userData]);

  return (
    <div>
      <Header userData={userData} />
      <div className="cardsList">
        {sightingsData.map((sighting) => {
          console.log(sighting.user);
          return (
            <CardInfo
              id={sighting.id}
              name={sighting.name}
              description={sighting.description}
              user={sighting.user}
              picture={sighting.picture}
              likes_count={sighting.likes_count}
              comments_count={sighting.comments_count}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserSightingsList;
