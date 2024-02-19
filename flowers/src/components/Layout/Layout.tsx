import React, { ReactNode, useState } from "react";
import logo from "../../assets/images/flowerLogo.svg";
import { Link } from "../Link/Link";
import Modal from "react-modal";
import Popup from "../popups/Popup";
import Login from "../forms/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closePopup, openPopup } from "../../store/popup-slice";

interface LayoutProps {
  children?: ReactNode;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, type } = useSelector((state: RootState) => state.popup);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closePopup());
  };

  const openLoginPopup = () => {
    dispatch(openPopup("login"));
  };

  const openCreateAccountPopup = () => {
    dispatch(openPopup("createAccount"));
  };

  const openUserInfoPopup = () => {
    dispatch(openPopup("userInfo"));
  };

  return (
    <div className="layoutContainer">
      <div className="layoutContainer__leftSide">
        <img src={logo} alt="Logo" />
        <span>FlowerSport</span>
      </div>
      <div className="layoutContainer__rightSide">
        <Link
          name="Flowers"
          style="layoutContainer__rightSide__link"
          route="/"
        />
        <Link
          name="Latest sightings"
          style="layoutContainer__rightSide__link"
          route="/cards"
        />
        <Link
          name="Favorites"
          style="layoutContainer__rightSide__link"
          route="/favorites"
        />
        <button
          onClick={openLoginPopup}
          className="bayoutContainer__rightSide__link layoutContainer__rightSide__link--loginLink"
        >
          Login
        </button>
        <button onClick={openCreateAccountPopup} className="btn-modal">
          New Account
        </button>
        <button
          onClick={openUserInfoPopup}
          className="bayoutContainer__rightSide__link layoutContainer__rightSide__link--loginLink"
        >
          Username
        </button>
      </div>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <Popup isOpen={isOpen} type={type} />
      </Modal>

      {children}
    </div>
  );
};

export default Layout;
