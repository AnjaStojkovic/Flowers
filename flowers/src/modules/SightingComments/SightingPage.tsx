import { useEffect, useState } from "react";
import Comments from "./Comments";
import { useParams } from "react-router-dom";
import SightingsService from "../../services/SightingsService";
import Sighting from "./Sighting";

interface User {
  id: number;
  full_name: string;
}

interface Sighting {
  id: number;
  name: string;
  description: string;
  picture: string;
  comments_count?: number;
  likes_count: number;
  user?: User;
  created_at: Date;
}

const SightingPage = () => {
  const [sightingData, setSightingData] = useState<Sighting>();
  const { sightingId } = useParams();
  console.log(sightingData);

  const getSightingData = async (sightingId: any) => {
    try {
      const { sighting } = await SightingsService.getOneSighting(sightingId);
      console.log(sighting);
      setSightingData(sighting);
    } catch (error) {
      console.error("An error occurred while fetching the sighting:", error);
    }
  };

  useEffect(() => {
    getSightingData(sightingId);
  }, []);

  return (
    <>
      <Sighting
        id={sightingData?.id}
        name={sightingData?.name}
        full_name={sightingData?.user?.full_name}
        description={sightingData?.description}
        comments_count={sightingData?.comments_count}
        likes_count={sightingData?.likes_count}
        picture={sightingData?.picture}
        created_at={sightingData?.created_at}
      />
      {sightingData?.created_at && (
        <Comments
          created_at={sightingData?.created_at}
          comments_count={sightingData?.comments_count}
        />
      )}
    </>
  );
};

export default SightingPage;
