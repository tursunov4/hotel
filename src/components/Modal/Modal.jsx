import React from "react";
import "./Modal.scss";
function Modal({ text, className, isActive }) {
  return (
    <div
      id="modal"
      className={`${className ? className : ""} ${isActive ? "active" : ""}`}
    >
      <span></span>
      <p>{text}</p>
    </div>
  );
}

export default Modal;
