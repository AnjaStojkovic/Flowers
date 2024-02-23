import { useState } from "react";
import Background from "./Background";
import FlowersList from "./FlowersList";
import SearchBox from "../../components/SearchBox";

const Homepage = () => {
  const [searchParams, setSearchParams] = useState({ name: "" });

  const handleSearch = (searchTerm: string) => {
    setSearchParams({ name: searchTerm });
  };

  return (
    <div className="homepageContainer">
      <Background />
      <div className="homepageContainer__search-box">
        <SearchBox onSearchSubmit={handleSearch} />
      </div>
      <FlowersList searchParams={searchParams} />
    </div>
  );
};

export default Homepage;
