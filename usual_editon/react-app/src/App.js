import React, { useReducer, useState } from "react";
import Meals from "./components/Meals/Meals";
import { MEALS_DATA } from "./constants/product";
import CartContext from "./store/card-context";
import FilterMeals from "./components/FilterMeals/FilterMeals";
import Card from "./components/Card/Card";

export default function App() {
  //存储食物列表
  const [mealsData, setMealsData] = useState(MEALS_DATA);
  //存储购物车数据
  /*
   *   1.商品 [] items
   *   2.商品总数（totalAmount）
   *   3.商品总价（totalPrice）
   * */

  //使用reducer做集中处理
  const cartReducer = (state, action) => {
    //赋值商品
    const newCard = { ...state };
    //函数回调
    switch (action.type) {
      case "addItem":
        //判断购物车中是否有该商品
        if (newCard.items.indexOf(action.meal) === -1) {
          //不存在该商品,添加到购物车
          newCard.items.push(action.meal);
          action.meal.amount = 1;
        } else {
          action.meal.amount += 1;
        }
        // 增加总数
        newCard.totalAmount += 1;
        // 增加总金额
        newCard.totalPrice += action.meal.price;
        return newCard;
      case "removeItem":
        action.meal.amount -= 1;
        //为0时,移除该商品
        if (action.meal.amount === 0) {
          newCard.items.splice(newCard.items.indexOf(action.meal), 1);
        }
        newCard.totalAmount -= 1;
        newCard.totalPrice -= action.meal.price;
        return newCard;
      case "clearCart":
        newCard.items.forEach((item) => delete item.amount);
        newCard.items = [];
        newCard.totalAmount = 0;
        newCard.totalPrice = 0;
        return newCard;
      default:
        return state;
    }
  };
  const [shopCartData, shopCartDataDispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  });

  //搜索框过滤
  const filterHandler = (keyword) => {
    //对内容进行检测,为空返回所有内容
    if (keyword === "") {
      setMealsData(MEALS_DATA);
      return;
    }
    const newMealsData = MEALS_DATA.filter(
      (item) => item.title.indexOf(keyword) !== -1
    );
    setMealsData(newMealsData);
  };
  return (
    <CartContext.Provider value={{ ...shopCartData, shopCartDataDispatch }}>
      <div>
        <FilterMeals onFilter={filterHandler} />
        <Meals meals_data={mealsData} />
        <Card />
      </div>
    </CartContext.Provider>
  );
}
