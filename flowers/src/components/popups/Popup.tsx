import React, { useState } from "react";
import CreateAccount from "../Forms/CreateAccount";
import Login from "../Forms/Login";
import { useDispatch } from "react-redux";
import UserInfo from "../UserData/UserInfo";
import Settings from "../Settings";

interface PopupProps {
  isOpen: boolean;
  type: "login" | "createAccount" | "userInfo" | "settings";
}

const Popup: React.FC<PopupProps> = ({ isOpen, type }) => {
  const dispatch = useDispatch();
  return (
    <>
      {isOpen && (
        <div className="popup">
          {type === "login" && <Login />}
          {type === "createAccount" && <CreateAccount />}
          {type === "userInfo" && <UserInfo />}
          {type === "settings" && <Settings />}
        </div>
      )}
    </>
  );
};
export default Popup;
