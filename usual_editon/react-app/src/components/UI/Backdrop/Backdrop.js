import React from "react";
import classes from "./Backdrop.module.css";
import ReactDOM from "react-dom";

const backDropRoot = document.getElementById("backdrop-root");

export default function Backdrop(props) {
  return ReactDOM.createPortal(
    <div {...props} className={`${classes.Backdrop} ${props.className}`}>
      {props.children}
    </div>,
    backDropRoot
  );
}
