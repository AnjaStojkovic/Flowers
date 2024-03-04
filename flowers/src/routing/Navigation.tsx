import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../modules/HomePage/Homepage";
import NotFound from "../modules/NotFound";
import FlowerDetails from "../modules/FlowerDetails/FlowerDetails";
import FavoritesList from "../modules/Favorites/FavoritesList";
import SightingPage from "../modules/Sighting/SightingPage";
import AddSighting from "../modules/AddSighting/AddSighting";
import SightingListPage from "../modules/SightingList/SightingListPage";
import UserSightingsList from "../modules/UserSightings/UserSightingsList";
import Settings from "../components/Settings";
import EditSighting from "../components/Forms/EditSighting";

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
    {
      path: "/edit/:sightingId",
      element: <EditSighting />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Navigation;
