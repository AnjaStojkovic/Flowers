import { useEffect, useState } from "react";
import CardInfo from "../../components/CardInfo";
import SightingsService from "../../services/SightingsService";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getSightingsData = async () => {
    try {
      const response = await SightingsService.getSightings(currentPage);
      const { sightings } = response;
      setSightingsData(sightings);
      setCurrentPage(response.meta.pagination.current_page);
      setTotalPages(response.meta.pagination.total_pages);
    } catch (error) {
      console.error("An error occurred while fetching sightings:", error);
      setSightingsData([]);
    }
  };

  useEffect(() => {
    getSightingsData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CardList;
