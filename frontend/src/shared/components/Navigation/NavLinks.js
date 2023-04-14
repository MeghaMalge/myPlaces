import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = ({ onClick }) => {
  const contextData = useContext(AuthContext);
  return (
    <>
      <li className="nav-link" onClick={onClick}>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      <li className="nav-link" onClick={onClick}>
        <NavLink to="/places" exact>
          All Places
        </NavLink>
      </li>
      <li className="nav-link" onClick={onClick}>
        <NavLink to="/myPlaces">My Places</NavLink>
      </li>
      <li className="nav-link" onClick={onClick}>
        <NavLink to="/places/new">New Place</NavLink>
      </li>
      {contextData.isLoggedIn ? (
        <li className="nav-link" onClick={contextData.logout}>
          <NavLink to="/auth">Log Out</NavLink>
        </li>
      ) : (
        <li className="nav-link">
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
    </>
  );
};

export default NavLinks;
