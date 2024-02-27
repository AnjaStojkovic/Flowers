import { useEffect, useState } from "react";
import FlowersService from "../../services/FlowersService";
import Favorite from "./Favorite";
import SearchBox from "../../components/SearchBox";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

interface Flower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
}

interface FavoriteData {
  id: number;
  flower: Flower;
}

const FavoritesList = () => {
  const [favoritesData, setFavoritesData] = useState<FavoriteData[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteData[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = favoritesData.filter(({ flower: { name } }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  };

  const handleRemoveFavorite = async (flowerId: number, id: number) => {
    try {
      await FlowersService.deleteFavoriteFlower(flowerId, id);
      setFavoritesData(favoritesData.filter((favorite) => favorite.id !== id));
      alert("Flower removed from favorites");
      window.location.reload();
    } catch (error) {
      alert("An error occured while removing flower from favorites");
    }
  };

  return (
    <>
      <div className="search-favorites">
        <SearchBox onSearchSubmit={handleSearch} />
      </div>
      <div className="favoritesList">
        {filteredFavorites?.map((favoriteData) => (
          <Favorite
            key={favoriteData.id}
            id={favoriteData.id}
            flowerId={favoriteData.flower.id}
            name={favoriteData.flower.name}
            latinName={favoriteData.flower.latin_name}
            sightings={favoriteData.flower.sightings}
            profilePicture={favoriteData.flower.profile_picture}
            onRemove={handleRemoveFavorite}
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

export default FavoritesList;
