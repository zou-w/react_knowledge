import React, { useContext, useState } from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./CardDetails.module.css";
import Meal from "../../Meals/Meal/Meal";
import CartContext from "../../../store/card-context";
import Confirm from "../../UI/Confirm/Confirm";

export default function CardDetails() {
  const ctx = useContext(CartContext);
  //控制显示确认框
  const [showConfirm, setShowConfirm] = useState(false);
  //添加函数显示确认窗口
  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  //取消
  const cancelHandler = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };
  //确认
  const okHandler = () => {
    //清空购物车
    ctx.shopCartDataDispatch({ type: "clearCart" });
  };
  return (
    <Backdrop>
      {showConfirm && (
        <Confirm
          onCancel={cancelHandler}
          onOk={okHandler}
          confirmText="确认清空购物车吗?"
        />
      )}
      <div className={classes.CartDetails} onClick={(e) => e.stopPropagation()}>
        <header className={classes.Header}>
          <h2 className={classes.Title}>餐品详情</h2>
          <div className={classes.Clear} onClick={showConfirmHandler}>
            <FontAwesomeIcon icon={faTrash} />
            <span>清空购物车</span>
          </div>
        </header>
        <div className={classes.MealList}>
          {ctx.items.map((item) => {
            return <Meal noDesc key={item.id} meal_data={item} />;
          })}
        </div>
      </div>
    </Backdrop>
  );
}
