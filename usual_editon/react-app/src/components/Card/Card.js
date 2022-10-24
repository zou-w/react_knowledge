import React, { useContext, useState } from "react";
import classes from "./Card.module.css";
import iconImg from "../../img/ico/bag.png";
import CartContext from "../../store/card-context";
import CardDetails from "./CardDetails/CardDetails";
import Checkout from "./Checkout/Checkout";

export default function Card() {
  const ctx = useContext(CartContext);
  //控制显示详情页的函数
  const [showDetails, setShowDetails] = useState(false);
  // 添加一个state设置结账页的显示于隐藏
  const [showCheckout, setShowCheckout] = useState(false);

  const toggleDetailsHandler = () => {
    if (ctx.totalAmount === 0) {
      setShowDetails(false);
      return;
    }
    setShowDetails((prevState) => !prevState);
  };
  const showCheckoutHandler = () => {
    if (ctx.totalAmount === 0) return;
    setShowCheckout(true);
  };

  const hideCheckoutHandler = () => {
    setShowCheckout(false);
  };
  return (
    <div className={classes.Cart} onClick={toggleDetailsHandler}>
      {showCheckout && <Checkout onHide={hideCheckoutHandler} />}

      {/*引入购物车的详情*/}
      {showDetails && <CardDetails />}

      <div className={classes.Icon}>
        <img src={iconImg} alt="图片加载出错" />
        {ctx.totalAmount === 0 ? null : (
          <span className={classes.TotalAmount}>{ctx.totalAmount}</span>
        )}
      </div>

      {ctx.totalAmount === 0 ? (
        <p className={classes.NoMeal}>未选购商品</p>
      ) : (
        <p className={classes.Price}>{ctx.totalPrice}</p>
      )}

      <button
        onClick={showCheckoutHandler}
        className={`${classes.Button} ${
          ctx.totalAmount === 0 ? classes.Disabled : ""
        }`}
      >
        去结算
      </button>
    </div>
  );
}
