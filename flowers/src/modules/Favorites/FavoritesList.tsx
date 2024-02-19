import { useEffect, useState } from "react";
import SightingsService from "../../services/SightingsService";
import FlowersService from "../../services/FlowersService";
import Card from "../HomePage/Card";
import Favorite from "./Favorite";
import { useDispatch, useSelector } from "react-redux";

interface Flower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  profile_picture: string;
}

interface Card {
  flower: Flower;
}

const FavoritesList = () => {
  const [flavoritesData, setFavoritesData] = useState<Card[]>([]);
  console.log(flavoritesData);
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.userId);

  const getFavorites = async (userId: any) => {
    try {
      const { favorites } = await FlowersService.getFavorites(userId);
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
    getFavorites(userId);
  }, []);

  return (
    <div className="cardsList">
      {flavoritesData.map((favorite) => (
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
  );
};

export default FavoritesList;
