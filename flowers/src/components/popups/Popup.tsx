import React, { useState } from 'react';
import CreateAccount from '../forms/CreateAccount';
import Login from '../forms/Login';

interface PopupProps {
  isOpen: boolean; 
  onRequestClose: () => void;
  popupType: 'login' | 'createAccount';
}


const Popup: React.FC<PopupProps> = ({ isOpen, onRequestClose, popupType }) => {

  return(
    <>
      {isOpen && (
        <div className="popup">
          {popupType === 'login' && <Login />}
          {popupType === 'createAccount' && <CreateAccount />}
        </div>
      )}
    </>

  )
  
  };
export default Popup;
