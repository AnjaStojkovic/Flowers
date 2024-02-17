import React from "react";

interface UserInfoItemProps {
  label: string;
  value: string;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className="info-details__label">{label}</p>
      <p className="info-details__value">{value}</p>
    </div>
  );
};

export default UserInfoItem;
