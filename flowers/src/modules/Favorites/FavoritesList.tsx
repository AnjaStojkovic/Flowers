import { useEffect, useState } from "react";
import SightingsService from "../../services/SightingsService";
import FlowersService from "../../services/FlowersService";
import Card from "../HomePage/Card";
import Favorite from "./Favorite";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../components/SearchBox";

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
  const [currentPage, setCurrentPage] = useState(1);
  console.log(favoritesData);
  const userId = useSelector((state: any) => state.user.userId);

  const getFavoritesData = async (userId: any, page: number) => {
    try {
      const response = await FlowersService.getFavorites(userId, page);
      const favorites = response.fav_flowers;
      console.log(favorites);
      setFavoritesData(favorites);
    } catch (error) {
      console.error(
        "An error occurred while fetching favorite flowers:",
        error
      );
      setFavoritesData([]);
    }
  };

  useEffect(() => {
    getFavoritesData(userId, currentPage);
  }, []);

  return (
    <>
      <div className="search-favorites">
        <SearchBox />
      </div>
      <div className="favoritesList">
        {favoritesData &&
          favoritesData.map((favorite) => (
            <Favorite
              key={favorite.flower.id}
              name={favorite.flower.name}
              latinName={favorite.flower.latin_name}
              sightings={favorite.flower.sightings}
              profilePicture={favorite.flower.profile_picture}
            />
          ))}
        ;
      </div>
    </>
  );
};

export default FavoritesList;
