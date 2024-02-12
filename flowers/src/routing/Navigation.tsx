import React from 'react';
import styles from "./Navigation.module.scss";
import { createBrowserRouter,
         RouterProvider,
         Route, 
         Link } from 'react-router-dom';
import Homepage from '../modules/HomePage/Homepage';


const Navigation: React.FC = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    }
  ]);

  return (
    <RouterProvider router={routes} />
    // const router = createBrowserRouter([
    //   {
    //     path: "/",
    //     element: <HomePage />,
    //     children: [
    //       {
    //         path: "contact",
    //         element: < />,
    //       },
    //     ],
    //   },
    // ]);
  );
}


export default Navigation;