import React, { useEffect, useState } from "react";
import BackgroundDetails from "./BackgroundDetails";
import FlowerInfo from "./FlowerInfo";
import { useParams } from "react-router-dom";
import FlowerSightings from "../FlowerDetails/FlowerSightings";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneFlower } from "../../store/flowers-slice";

const FlowerDetails: React.FC = () => {
  const { flowerId } = useParams();
  const dispatch = useDispatch<any>();
  const { currentFlower, loading, error } = useSelector(
    (state: any) => state?.flowers
  );

  useEffect(() => {
    dispatch(fetchOneFlower(Number(flowerId)));
  }, [dispatch]);

  const flower = currentFlower;

  console.log(currentFlower);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {currentFlower && (
        <>
          <BackgroundDetails
            name={currentFlower.name}
            latin_name={currentFlower.latin_name}
            sightings={currentFlower.sightings}
          />
          <FlowerInfo description={currentFlower.description} />
          <hr className="details-line" />
          <div className="flower-sightings">
            <FlowerSightings flowerId={currentFlower.id} />
          </div>
        </>
      )}
    </>
  );
};

export default FlowerDetails;
