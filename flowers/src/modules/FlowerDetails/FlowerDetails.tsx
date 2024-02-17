import React, { useEffect, useState } from "react";
import BackgroundDetails from "./BackgroundDetails";
import FlowerInfo from "./FlowerInfo";
import FlowersService from "../../services/FlowersService";
import { number } from "yup";
import { useParams } from "react-router-dom";

interface Flower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
  favorite: boolean;
  features: string[];
  description: string;
}

const FlowerDetails: React.FC = () => {
  const [flowerData, setFlowerData] = useState<Flower>();
  const { flowerId } = useParams();

  const getFlowerData = async (flowerId: any) => {
    try {
      const { flower } = await FlowersService.getOneFlower(flowerId);
      console.log(flower);
      setFlowerData(flower);
    } catch (error) {
      console.error("An error occurred while fetching the flower:", error);
    }
  };

  useEffect(() => {
    getFlowerData(flowerId);
  }, []);

  return (
    <>
      {flowerData && (
        <BackgroundDetails
          id={flowerData.id}
          name={flowerData.name}
          latin_name={flowerData.latin_name}
          sightings={flowerData.sightings}
          profile_picture={flowerData.profile_picture}
          favorite={flowerData.favorite}
          features={flowerData.features}
          description={flowerData.description}
        />
      )}
      <FlowerInfo />
    </>
  );
};

export default FlowerDetails;
