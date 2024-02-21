import { useEffect, useState } from "react";
import FlowersService from "../../services/FlowersService";
import Favorite from "./Favorite";
import SearchBox from "../../components/SearchBox";
import Pagination from "../../components/Pagination";

interface Flower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
}

interface FavoriteData {
  flower: Flower;
}

const FavoritesList = () => {
  const [favoritesData, setFavoritesData] = useState<FavoriteData[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteData[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  console.log(favoritesData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FlowersService.getFavorites(currentPage);
        const favorites = response.fav_flowers;
        setFavoritesData(favorites);
        setFilteredFavorites(favorites);
        setCurrentPage(response.meta.pagination.current_page);
        setTotalPages(response.meta.pagination.total_pages);
      } catch (error) {
        console.error(
          "An error occurred while fetching favorite flowers:",
          error
        );
        setFavoritesData([]);
        setFilteredFavorites([]);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = favoritesData.filter((favorite) =>
      favorite.flower.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  };

  return (
    <>
      <div className="search-favorites">
        <SearchBox onSearchSubmit={handleSearch} />
      </div>
      <div className="favoritesList">
        {filteredFavorites &&
          filteredFavorites.map((favorite) => (
            <Favorite
              key={favorite.flower.id}
              name={favorite.flower.name}
              latinName={favorite.flower.latin_name}
              sightings={favorite.flower.sightings}
              profilePicture={favorite.flower.profile_picture}
            />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </>
  );
};

export default FavoritesList;
