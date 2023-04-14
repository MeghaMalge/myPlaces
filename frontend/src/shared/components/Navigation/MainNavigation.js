import React, { useState } from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";
import { Link } from "react-router-dom";
import SideBar from "../UI/SideBar";

const MainNavigation = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const openSideBarHandler = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBarHandler = () => {
    setIsSideBarOpen(false);
  };

  return (
    <>
      <SideBar show={isSideBarOpen}>
        <button
          className="icon-button close-sidebar"
          onClick={closeSideBarHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="white"
            className="w-6 h-6 icon-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <NavLinks onClick={closeSideBarHandler} />
      </SideBar>
      <MainHeader>
        <header className="header">
          <Link to="/">MyPlaces</Link>
        </header>
        <button className="hamburger icon-button" onClick={openSideBarHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="white"
            className="w-6 h-6 icon-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <nav className="nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
