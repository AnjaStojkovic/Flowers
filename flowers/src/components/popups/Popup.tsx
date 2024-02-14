import React, { useState } from 'react';
import CreateAccount from '../forms/CreateAccount';

interface PopupProps {
  isOpen: boolean; 
  onRequestClose: () => void;
}


const Popup: React.FC<PopupProps> = ({ isOpen, onRequestClose }) => {

  return(
    <>
      <CreateAccount />
    </>

  )
  
  };
export default Popup;
