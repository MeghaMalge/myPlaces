import React from "react";
import UserItem from "./UserItem";

import "./UsersList.css";

const UsersList = ({ users }) => {
  if (users.length === 0)
    return (
      <div className="center">
        <h2>No Users Found</h2>
      </div>
    );

  return (
    <ul className="users-list">
      {users.map((user) => (
        <UserItem key={user._id} user={user} />
      ))}
    </ul>
  );
};

export default UsersList;
