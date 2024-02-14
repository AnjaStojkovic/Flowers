import { useState } from "react";
import Background from "./Background";
import FlowersList from "./FlowersList";

const Homepage = () => {
  const isOpen = true;
  return (
    <div className="homepageContainer">
      <Background />
      <FlowersList />
    </div>
  );
};

export default Homepage;
