import { useEffect, useState } from "react";
import Favorite from "./Favorite";
import SearchBox from "../../components/SearchBox";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteFlower,
  getFavoriteFlowers,
} from "../../store/flowers-slice";
import { AppThunk, RootState } from "../../store/store";
import { setCurrentPage } from "../../store/comments-slice";

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
  const dispatch = useDispatch<any>();
  const { favorites, loading, error, totalPages, currentPage } = useSelector(
    (state: RootState) => state.flowers
  );
  console.log(currentPage);
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteData[]>(
    []
  );

  useEffect(() => {
    dispatch(getFavoriteFlowers(0));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = favorites.filter(({ flower }) =>
      flower.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  };

  const handleRemoveFavorite = (flowerId: number, id: number) => {
    dispatch(deleteFavoriteFlower(flowerId, id));
    alert("Flower removed from favorites");
    window.location.reload();
  };

  return (
    <>
      <div className="search-favorites">
        <SearchBox onSearchSubmit={handleSearch} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="favoritesList">
        {(filteredFavorites.length > 0 ? filteredFavorites : favorites)?.map(
          (favorite) => (
            <Favorite
              key={favorite.id}
              id={favorite.id}
              flowerId={favorite.flower.id}
              name={favorite.flower.name}
              latinName={favorite.flower.latin_name}
              sightings={favorite.flower.sightings}
              profilePicture={favorite.flower.profile_picture}
              onRemove={handleRemoveFavorite}
            />
          )
        )}
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
function dispatch(arg0: AppThunk) {
  throw new Error("Function not implemented.");
}
