import React from "react";
import styles from "./Navigation.module.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Homepage from "../modules/HomePage/Homepage";
import NotFound from "../modules/NotFound";
import FlowerDetails from "../modules/FlowerDetails/FlowerDetails";

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
  ]);

  return <RouterProvider router={routes} />;
};

export default Navigation;
