import React from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UI/Card";
import Avatar from "../../shared/components/UI/Avatar";

import "./UserItem.css";

const UserItem = ({ user }) => {
  return (
    <li className="user">
      <Link to={`/${user.id}/places`}>
        <Card className="user-card">
          <Avatar imageUrl={user.image} alt={user.name} />
          <section className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-places">
              {user.places} {user.places === 1 ? "place" : "places"}
            </span>
          </section>
        </Card>
      </Link>
    </li>
  );
};

export default UserItem;
