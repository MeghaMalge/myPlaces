import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideBar.css";

function SideBar({ children, show }) {
  const sidebar = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="sidebar">{children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(sidebar, document.getElementById("sidebar"));
}

export default SideBar;
