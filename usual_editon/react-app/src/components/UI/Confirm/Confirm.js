import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Confirm.module.css";

export default function Confirm(props) {
  return (
    <Backdrop className={classes.ConfirmOuter}>
      <div className={classes.Confirm}>
        <p className={classes.ConfirmText}>{props.confirmText}</p>
        <div>
          <button
            onClick={(e) => props.onCancel(e)}
            className={classes.onCancel}
          >
            取消
          </button>
          <button onClick={(e) => props.onOk(e)} className={classes.Ok}>
            确认
          </button>
        </div>
      </div>
    </Backdrop>
  );
}
