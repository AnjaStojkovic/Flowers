import { useEffect, useState } from "react";
import FlowersService from "../../services/FlowersService";
import Card from "./Card";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  fetchFlowers,
  getSearchedFlowers,
  setCurrentPage,
} from "../../store/flowers-slice";

interface FlowersListProps {
  searchParams: { name: string };
}

const FlowersList: React.FC<FlowersListProps> = ({ searchParams }) => {
  const dispatch = useDispatch<any>();
  const { flowers, loading, error, totalPages, currentPage } = useSelector(
    (state: RootState) => state.flowers
  );

  useEffect(() => {
    if (searchParams.name !== "") {
      dispatch(getSearchedFlowers(searchParams.name));
    } else {
      dispatch(fetchFlowers(currentPage));
    }
  }, [dispatch, currentPage, searchParams]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="imagesList">
        {flowers.map((flower) => (
          <Card
            key={flower.id}
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
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default FlowersList;
