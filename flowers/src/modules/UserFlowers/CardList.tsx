import { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
import Header from "./Header";
import SightingsService from "../../services/SightingsService";
import Pagination from "../../components/Pagination";

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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default CardList;
