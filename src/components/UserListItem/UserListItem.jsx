import React from "react";
import { Link } from "react-router-dom";
import defaultProfileImage from "../../assets/profile.png";

const UserListItem = ({ user }) => {
  return (
    <li className="list-group-item list-group-item-action" key={user.id}>
      <Link to={`/user/${user.id}`}>
        <img
          className="rounded-circle shadow-sm"
          src={defaultProfileImage}
          width="30"
          alt="Profile image"
        />
        {user.username}
      </Link>
    </li>
  );
};

export default UserListItem;
