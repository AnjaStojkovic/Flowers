import React, { useEffect } from "react";
import CardInfo from "../../components/CardInfo";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchSightings, setCurrentPage } from "../../store/sightings-slice";

const CardList = () => {
  const dispatch = useDispatch<any>();
  const { sightings, loading, error, totalPages, currentPage } = useSelector(
    (state: RootState) => state.sightings
  );

  useEffect(() => {
    dispatch(fetchSightings(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <div className="cardsList">
        {loading && <p>Loading comments...</p>}
        {error && <p>Error: {error}</p>}
        {sightings.length > 0 ? (
          <>
            {sightings.map((sighting) => (
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
          </>
        ) : (
          <p>No sightings available.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CardList;
