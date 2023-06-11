import React from "react";
import "./Logo.scss";
import logo from "./../../assets/images/logo.png";
function Logo() {
  return (
    <div className="component-logo">
      <img height={50} src={logo} alt="logo" />
    </div>
  );
}

export default Logo;
