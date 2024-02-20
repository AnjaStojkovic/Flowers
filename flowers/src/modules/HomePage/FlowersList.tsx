import { useEffect, useState } from "react";
import FlowersService from "../../services/FlowersService";
import Card from "./Card";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchParams.name !== "") {
          response = await FlowersService.getSearchedFlowers(searchParams.name);
        } else {
          response = await FlowersService.getFlowers();
        }
        console.log(response.flowers);
        setFlowersData(response.flowers);
      } catch (error) {
        console.error("An error occurred while fetching flowers:", error);
        setFlowersData([]);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
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
  );
};

export default FlowersList;
