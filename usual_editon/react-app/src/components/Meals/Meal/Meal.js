import React from "react";
import classes from "./Meal.module.css";
import Counter from "../../UI/Counter/Counter";

export default function Meal(props) {
  const { title, img, price, desc } = props.meal_data;
  return (
    <div className={classes.Meal}>
      <div className={classes.ImgBox}>
        <img src={img} alt="图片显示问题" />
      </div>
      <div className={classes.DescBox}>
        <h2 className={classes.Title}>{title}</h2>
        {props.noDesc ? null : <p className={classes.Desc}>{desc}</p>}
        <div className={classes.PriceWrap}>
          <span className={classes.Price}>{price}</span>
          <div>
            <Counter meal={props.meal_data} />
          </div>
        </div>
      </div>
    </div>
  );
}
