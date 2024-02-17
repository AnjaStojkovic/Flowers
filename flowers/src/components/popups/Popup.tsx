import React, { useState } from "react";
import CreateAccount from "../forms/CreateAccount";
import Login from "../forms/Login";
import { useDispatch } from "react-redux";

interface PopupProps {
  isOpen: boolean;
  type: "login" | "createAccount";
}

const Popup: React.FC<PopupProps> = ({ isOpen, type }) => {
  const dispatch = useDispatch();
  return (
    <>
      {isOpen && (
        <div className="popup">
          {type === "login" && <Login />}
          {type === "createAccount" && <CreateAccount />}
        </div>
      )}
    </>
  );
};
export default Popup;
