import { useEffect } from "react";
import CardInfo from "../../components/CardInfo";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSightings } from "../../store/sightings-slice";

interface FlowerProps {
  flowerId: number;
}

const FlowerSightings: React.FC<FlowerProps> = ({ flowerId }) => {
  const dispatch = useDispatch<any>();
  const { sightings, loading, error, currentPage } = useSelector(
    (state: RootState) => state.sightings
  );

  useEffect(() => {
    dispatch(fetchSightings(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="cardsList">
        {sightings
          .filter(
            (sighting) => sighting.flower && sighting.flower.id === flowerId
          )
          .map((sighting: any) => (
            <CardInfo
              key={sighting.id}
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
    </div>
  );
};

export default FlowerSightings;
