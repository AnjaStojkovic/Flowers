import { useEffect, useState } from "react";
import FlowersService from "../../services/FlowersService";
import Card from "./Card";
import Pagination from "../../components/Pagination";

interface Flower {
  latin_name: string;
  id: number;
  name: string;
  sightings: number;
  profile_picture: string;
}

interface FlowersListProps {
  searchParams: { name: string };
}

const FlowersList: React.FC<FlowersListProps> = ({ searchParams }) => {
  const [flowersData, setFlowersData] = useState<Flower[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchParams.name !== "") {
          response = await FlowersService.getSearchedFlowers(searchParams.name);
        } else {
          response = await FlowersService.getFlowers(currentPage);
        }
        console.log(response.flowers);
        setFlowersData(response.flowers);
        setCurrentPage(response.meta.pagination.current_page);
        setTotalPages(response.meta.pagination.total_pages);
      } catch (error) {
        console.error("An error occurred while fetching flowers:", error);
        setFlowersData([]);
      }
    };

    fetchData();
  }, [searchParams, currentPage]);

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
    <>
      <div className="imagesList">
        {flowersData.map((flower) => (
          <Card
            id={flower.id}
            name={flower.name}
            description={flower.latin_name}
            sightings={flower.sightings}
            imageUrl={flower.profile_picture}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </>
  );
};

export default FlowersList;
