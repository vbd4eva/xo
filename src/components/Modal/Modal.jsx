// import React, { Component } from "react";
import { createPortal } from "react-dom";
// import "./Modal.scss";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ children }) {
  return createPortal(
    <div className="Modal__backdrop">
      {/* <div className="Modal__backdrop" onClick={this.handleBackdropClick}> */}
      <div className="Modal__content">{children}</div>
    </div>,
    modalRoot
  );
}
