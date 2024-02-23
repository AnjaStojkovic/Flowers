import React from "react";
import styles from "./Navigation.module.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../modules/HomePage/Homepage";
import NotFound from "../modules/NotFound";
import FlowerDetails from "../modules/FlowerDetails/FlowerDetails";
import FavoritesList from "../modules/Favorites/FavoritesList";
import SightingPage from "../modules/SightingComments/SightingPage";
import AddSighting from "../modules/AddSighting/AddSighting";
import SightingListPage from "../modules/SightingList/SightingListPage";
import UserSightingsList from "../modules/UserSightings/UserSightingsList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Settings from "../components/Settings";

const Navigation: React.FC = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      errorElement: <NotFound />,
    },
    {
      path: "/details/:flowerId",
      element: <FlowerDetails />,
    },
    {
      path: "/sightings",
      element: <SightingListPage />,
    },
    {
      path: "/usersightings",
      element: <UserSightingsList />,
    },
    {
      path: "/favorites",
      element: <FavoritesList />,
    },
    {
      path: "/sighting/:sightingId",
      element: <SightingPage />,
    },
    {
      path: "/create",
      element: <AddSighting />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Navigation;
