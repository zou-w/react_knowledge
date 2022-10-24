import React, { useState } from "react";
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
  const [shopCartData, setShopCardShop] = useState({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  });

  //购物车添加商品
  const addItem = (meal) => {
    //赋值商品
    const newCard = { ...shopCartData };
    //判断购物车中是否有该商品
    if (newCard.items.indexOf(meal) === -1) {
      //不存在该商品,添加到购物车
      newCard.items.push(meal);
      meal.amount = 1;
    } else {
      meal.amount += 1;
    }
    // 增加总数
    newCard.totalAmount += 1;
    // 增加总金额
    newCard.totalPrice += meal.price;

    // 重新设置购物车
    setShopCardShop(newCard);
  };

  //购物车减少商品
  const removeItem = (meal) => {
    const newCard = { ...shopCartData };
    meal.amount -= 1;
    //为0时,移除该商品
    if (meal.amount === 0) {
      newCard.items.splice(newCard.items.indexOf(meal), 1);
    }
    newCard.totalAmount -= 1;
    newCard.totalPrice -= meal.price;
    setShopCardShop(newCard);
  };

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

  //清空购物车
  const clearCart = () => {
    const newCard = { ...shopCartData };
    //将购物车中商品数量清零
    newCard.items.forEach((item) => delete item.amount);
    newCard.items = [];
    newCard.totalAmount = 0;
    newCard.totalPrice = 0;
    setShopCardShop(newCard);
  };
  return (
    <CartContext.Provider
      value={{ ...shopCartData, addItem, removeItem, clearCart }}
    >
      <div>
        <FilterMeals onFilter={filterHandler} />
        <Meals meals_data={mealsData} />
        <Card />
      </div>
    </CartContext.Provider>
  );
}
