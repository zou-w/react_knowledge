import React from "react";
import classes from "./CheckoutItem.module.css";
import Counter from "../../../UI/Counter/Counter";

export default function CheckoutItem(props) {
  const { img, title, price } = props.meal;
  return (
    <div className={classes.CheckoutItem}>
      <div className={classes.MealImg}>
        <img src={img} alt="图片加载出错" />
      </div>
      <div className={classes.Desc}>
        <h2 className={classes.Title}>{title}</h2>
        <div className={classes.PriceOuter}>
          <Counter meal={props.meal} />
          <div className={classes.Price}>{price}</div>
        </div>
      </div>
    </div>
  );
}
