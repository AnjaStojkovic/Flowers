import { useEffect, useState } from "react";
import SightingsService from "../../services/SightingsService";
import CardInfo from "../../components/CardInfo";

interface User {
  id: number;
  full_name: string;
}

interface Flower {
  id: number;
  name: string;
  latin_name: string;
  profile_picture: string;
}

interface Sighting {
  name: string;
  id: number;
  full_name: string;
  user: User;
  description: string;
  picture: string;
  likes_count: number;
  comments_count: number;
  flower: Flower;
}

interface FlowerProps {
  flowerId: number;
}

const FlowerSightings: React.FC<FlowerProps> = ({ flowerId }) => {
  const [sightingsData, setSightingsData] = useState<Sighting[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getSightingsData = async () => {
    try {
      const response = await SightingsService.getSightings(currentPage);
      const { sightings } = response;
      const filteredSightings = sightings.filter(
        (sighting: Sighting) => sighting.flower.id === flowerId
      );
      setSightingsData(filteredSightings);
      setCurrentPage(response.meta.pagination.current_page);
    } catch (error) {
      console.error("An error occurred while fetching sightings:", error);
      setSightingsData([]);
    }
  };

  useEffect(() => {
    getSightingsData();
  }, [currentPage, flowerId]);

  return (
    <div>
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
      </div>
    </div>
  );
};

export default FlowerSightings;
