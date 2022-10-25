import React, { useContext } from "react";
import classes from "./Counter.module.css";
//使用fontawesome图标
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../../store/card-context";

//计数,加减
export default function Counter(props) {
  //获取cardContext数据
  const ctx = useContext(CartContext);
  // 添加购物车的函数
  const addButtonHandler = () => {
    ctx.shopCartDataDispatch({ type: "addItem", meal: props.meal });
  };

  // 删除食物的函数
  const subButtonHandler = () => {
    ctx.shopCartDataDispatch({ type: "removeItem", meal: props.meal });
  };
  return (
    <div className={classes.Counter}>
      {props.meal.amount && props.meal.amount !== 0 ? (
        <>
          <button onClick={subButtonHandler} className={classes.Sub}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className={classes.count}>{props.meal.amount}</span>
        </>
      ) : null}

      <button onClick={addButtonHandler} className={classes.Add}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
