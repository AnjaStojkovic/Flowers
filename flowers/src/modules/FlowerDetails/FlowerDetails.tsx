import React, { useEffect, useState } from "react";
import BackgroundDetails from "./BackgroundDetails";
import FlowerInfo from "./FlowerInfo";
import FlowersService from "../../services/FlowersService";
import { useParams } from "react-router-dom";
import FloweSightings from "../FlowerDetails/FlowerSightings";
import FlowerSightings from "../FlowerDetails/FlowerSightings";

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
        <>
          <BackgroundDetails
            name={flowerData.name}
            latin_name={flowerData.latin_name}
            sightings={flowerData.sightings}
          />
          <FlowerInfo description={flowerData.description} />
          <hr className="details-line" />
          <div className="flower-sightings">
            <FlowerSightings flowerId={flowerData.id} />
          </div>
        </>
      )}
    </>
  );
};

export default FlowerDetails;
