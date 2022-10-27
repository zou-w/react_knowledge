# React复习

## 1.基础

**1.React.createElement():**用来创建一个react元素

参数:

1. 元素的名称(组件名)
2. 元素中的属性(在设置事件时需要修改为**驼峰命名法**,class需要改为className)
3. 元素的内容(子元素)

**2.ReactDOM.createRoot():**用来创建一个React根元素,需要一个DOM元素作为参数

**3.render():**将元素渲染到某个元素(根元素)中

```js
//创建react元素
const button = React.createElement("button", {className:'btn',onClick:()=> alert(123)}, "hello react");
//创建根元素
const root = ReactDOM.createRoot(document.getElementById("root"));
//将div渲染到根元素中
root.render(div);
```

## 2.依赖

```shell
//手动创建项目
npm install react react-dom react-scripts
//自动创建项目
npx create-react-app name

//打包
npx react-scripts build
//运行
npx react-scripts start
```

## 3.hook

### 1.**`useState()`:**

异步执行,当调用setState()需要用到旧state时,可能会出现计算错误

使用回调函数可以解决

```js
setCounter(preCounter => preCounter+1)
```

### 2.**`useRef()`:**

返回一个ref对象,并且保持不变,不会刷新

### 3.**`useContext():`**

配合context使用

### 4.**`useReducerr:`**

**`reducer`一般会创建在组件外部,避免重复创建**

- `state`:当前状态
- `action`:对象

```js
//定义到组件外部
const [count,countDispatch] = useReducer((state,action)=>{
    //根据action.type进行判断执行操作
    switch(action.type){
        case 'ADD':
            return state+1
        case 'SUB':
            return state-1  
        default:
            return state
	}
},1)

const add =()=>{
    countDispatch({type:'ADD'})
}
```

```js
//使用reducer函数
//需要将新值return回去

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

//定义cartReducer函数
  const [shopCartData, shopCartDataDispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  });
```

**`useEddect`和`useCallback`都是第一个参数是函数,第二个是依赖项**

### 5.**`useEffect():`**

**使用:**

1. 第一个参数:函数(在组件渲染完毕后执行,需要一个函数作为参数)
2. 第二个参数:数组(依赖项),通常会将使用的变量都设置到数组中,setState方法可以不设置

如果设置了一个空数组,只会在初始化执行一次

**可以解决函数体里面写代码的弊端,引发too many render**

### 6.**`useCallback():`**

- 回调函数
- 依赖数组,中的变量发生变化时,才重新渲染

不会总在组件重新渲染时重新创建



## 4.others

#### 1.poral

react Portal实现传送门（可以把组件挂载到任意节点上）

```js
ReactDOM.createPortal(child,container)
```

第一个参数child是可渲染的react子项，container是需要挂载到dom元素

**使用:**

- 引入`import ReactDOM from "react-dom";`

- 获取节点`const backdropRoot = document.getElementById('backdrop-root')`

- 挂载

  ```react
  ReactDOM.createPortal(<div className="backdrop">
          {props.children}react
      </div>, backdropRoot);
  ```

#### 2.css模块

1. 创建`App.module.css`
2. 在组件引用`import classes from './App.module.css'`
3. 通过`className={classes.p1} `

#### 3.Fragment

`<React.Fragment></React.Fragment>` ===`<></>`

专门用来作为父容器的组件,不会创建任何多余的元素

#### 4.context

context相当于一个公共的存储空间,可以将多个组件中都需要访问的数据统一存储到一个context中国

```react
import React from 'react'

//生产数据
 <TestContext.Provider value={{name:'沙和尚', age:38}} >
                        <B/>
 </TestContext.Provider>

//使用
import TestContext from "../store/testContext";

const B = () => {

    // 使用钩子函数获取Context
    const ctx = useContext(TestContext);

    return (
        <div>
            {ctx.name} -- {ctx.age}
        </div>
    );
};

```

#### 5.Memo

`React.memo(A)`是一个高阶组件

*       它接收另一个组件作为参数，并且会返回一个包装过的新组件
*       包装过的新组件就会具有缓存功能，
*           包装过后，只有组件的props发生变化化
*           才会触发组件的重新的渲染，否则总是返回缓存中结果

#### 6.strapi

## 5.请求

组件初始化时需要向服务器发起数据

需要使用`useEffect`组件

