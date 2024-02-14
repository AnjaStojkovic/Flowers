import React, { ReactNode, useState } from 'react';
import logo from "../../assets/images/flowerLogo.svg"
import { Link } from '../Link/Link';
import Modal from 'react-modal';
import Popup from '../popups/Popup';
import Login from '../forms/Login';

interface LayoutProps {
  children?: ReactNode; 
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dodaje poluprozirnu crnu pozadinu
  },
};

const Layout: React.FC<LayoutProps> = ({ children}) => {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [popupType, setPopupType] = React.useState<'login' | 'createAccount'>('login'); 


  const openModal =() => {
    setIsOpen(true);
  }

   const closeModal = () => {
    setIsOpen(false);
  }

  const openLoginPopup = () => {
    setPopupType('login'); 
    setIsOpen(true);
  };
  
  const openCreateAccountPopup = () => {
    setPopupType('createAccount'); 
    setIsOpen(true);
  }
  return (
    <div className="layoutContainer">
      <div className="layoutContainer__leftSide">
        <img src={logo} alt="Logo" />
        <span>FlowerSport</span>
      </div>
      <div className="layoutContainer__rightSide">
        <Link name='Flowers' style="layoutContainer__rightSide__link" /> 
        <button onClick={openLoginPopup} className="bayoutContainer__rightSide__link layoutContainer__rightSide__link--loginLink">Login</button>
        <button onClick={openCreateAccountPopup} className="btn-modal">
          New Account
        </button>
      </div>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      > 
      <Popup 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        popupType={popupType}/>
      </Modal>

      {children} 
    </div>
  );
}

export default Layout;
