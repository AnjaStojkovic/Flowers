import { useEffect, useState } from "react";
import Comments from "./Comments";
import { useParams } from "react-router-dom";
import SightingsService from "../../services/SightingsService";
import Sighting from "./Sighting";
import LikesService from "../../services/LikesService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchOneSighting } from "../../store/sightings-slice";

interface Likes {
  id: number;
  sighting_id: number;
  user_full_name: string;
  user_id: number;
}

const SightingPage = () => {
  const [likes, setLikes] = useState<Likes[]>([]);
  const { sightingId } = useParams();
  const { userId } = useSelector((state: RootState) => state?.user.user);

  const dispatch = useDispatch<any>();
  const { currentSighting } = useSelector(
    (state: any) => state?.sightings
  );

  useEffect(() => {
    dispatch(fetchOneSighting(Number(sightingId)));
  }, [dispatch]);

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
    getLikes(sightingId);
  }, [sightingId]);

  return (
    <>
      <Sighting
        id={currentSighting?.id}
        name={currentSighting?.name}
        full_name={currentSighting?.user?.full_name}
        description={currentSighting?.description}
        comments_count={currentSighting?.comments_count}
        likes_count={currentSighting?.likes_count}
        picture={currentSighting?.picture}
        created_at={currentSighting?.created_at}
        isLiked={isSigthingLiked()}
      />
      {currentSighting?.created_at && (
        <Comments
          created_at={currentSighting?.created_at}
          comments_count={currentSighting?.comments_count}
          sightingId={currentSighting.id}
        />
      )}
    </>
  );
};

export default SightingPage;
