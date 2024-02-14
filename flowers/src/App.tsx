import React, { Children, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { Navigate } from "react-router-dom";
import Navigation from "./routing/Navigation";

const App: React.FC = () => {
  return (
    <>
      <Layout />
      <Navigation />
    </>
  );
};

export default App;
