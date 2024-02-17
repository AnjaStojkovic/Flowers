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

const FlowersList: React.FC = () => {
  const [flowersData, setFlowersData] = useState<Flower[]>([]);

  const getFlowersData = async () => {
    try {
      const { flowers } = await FlowersService.getFlowers();
      console.log(flowers);
      setFlowersData(flowers);
    } catch (error) {
      console.error("An error occurred while fetching flowers:", error);
      setFlowersData([]);
    }
  };

  useEffect(() => {
    getFlowersData();
  }, []);

  return (
    <div className="imagesList">
      {flowersData.map((flower) => (
        <Card
          key={flower.id}
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
