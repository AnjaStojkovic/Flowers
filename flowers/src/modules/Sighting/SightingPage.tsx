import { useEffect, useState } from "react";
import Comments from "./Comments";
import { useParams } from "react-router-dom";
import SightingsService from "../../services/SightingsService";
import Sighting from "./Sighting";
import LikesService from "../../services/LikesService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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

interface Likes {
  id: number;
  sighting_id: number;
  user_full_name: string;
  user_id: number;
}

const SightingPage = () => {
  const [sightingData, setSightingData] = useState<Sighting>();
  const [likes, setLikes] = useState<Likes[]>([]);
  const { sightingId } = useParams();
  const { userId } = useSelector((state: RootState) => state?.user);

  const getSightingData = async (sightingId: any) => {
    try {
      const { sighting } = await SightingsService.getOneSighting(sightingId);
      setSightingData(sighting);
    } catch (error) {
      console.error("An error occurred while fetching the sighting:", error);
    }
  };

  const getLikes = async (sightingId: any) => {
    try {
      const result = await LikesService.getLikesForOneSighting(sightingId);
      setLikes(result?.likes);
    } catch (error) {
      console.error("An error occurred while fetching likes:", error);
    }
  };

  const isSigthingLiked = () => {
    const like = likes.find((like) => like?.user_id === userId);

    if (!like) return false;
    return true;
  };

  useEffect(() => {
    getSightingData(sightingId);
    getLikes(sightingId);
  }, [sightingId]);

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
        isLiked={isSigthingLiked()}
      />
      {sightingData?.created_at && (
        <Comments
          created_at={sightingData?.created_at}
          comments_count={sightingData?.comments_count}
          sightingId={sightingData.id}
        />
      )}
    </>
  );
};

export default SightingPage;
