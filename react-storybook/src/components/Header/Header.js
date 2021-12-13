import React from "react";
import "./Header.css";

const Header = ({ children }) => {
  return <h1 className="header">{children}</h1>;
};

export default Header;
