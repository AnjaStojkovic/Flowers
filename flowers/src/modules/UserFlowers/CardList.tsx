import { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import Header from "./Header";
import SightingsService from "../../services/SightingsService";

interface User {
  id: number;
  full_name: string;
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

const CardList = () => {
  const [sightingsData, setSightingsData] = useState<Card[]>([]);

  const getSightingsData = async () => {
    try {
      const { sightings } = await SightingsService.getSightings();
      console.log(sightings);
      setSightingsData(sightings);
    } catch (error) {
      console.error("An error occurred while fetching sightings:", error);
      setSightingsData([]);
    }
  };

  useEffect(() => {
    getSightingsData();
  }, []);

  console.log(sightingsData);

  return (
    <div>
      <Header />
      <div className="cardsList">
        {sightingsData.map((sighting) => (
          <CardInfo
            id={sighting.id}
            name={sighting.name}
            description={sighting.description}
            user={sighting.user}
            picture={sighting.picture}
            likes_count={sighting.likes_count}
            comments_count={sighting.comments_count}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default CardList;
