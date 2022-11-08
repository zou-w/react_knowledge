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

## 6.redux

### 1.使用步骤

- 引入redux核心包
- 创建reducer整合函数
- 通过reducer对象创建store
- 对store中的state进行订阅
- 通过dispatch派发state的操作指令

### 2.RTK使用

npm install react-redux @reduxjs/toolkit -S

yarn add react-redux @reduxjs/toolkit

**使用:**

- 引入provider,一个store
- 创建切片`createSlice`
- 创建store,`configureStore`

**过程:**

- 方法在创建的slice对象的action身上
- 状态使用useSelector获取
- 方法使用useDispatch获取

## 7.Router

### 1.**安装:**

```shell
npm:
npm install react-router-dom@6

yarn:
yarn add react-router-dom@6
```

### 2.**使用:**

1.在index.js中进行导入,`<App>` 的最外侧包裹一个 `<BrowserRouter>` 或 `<HashRouter>`

```js
import { BrowserRouter as Router } from "react-router-dom";

<Router>
    <App />
</Router>
```

**2.在组件中导入对应路由链接组件,设路由链接**

```js
import { Link, Routes, Route } from 'react-router-dom'

<Link className='list-group-item' to="/about">About</Link>
<Link className='list-group-item' to="/home">Home</Link>
```



**3.在组件中(App.js)导入`Route`渲染组件,注册路由**

```js
import { Route, Routes } from "react-router-dom";

 <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
</Routes>
```

**4.在组件中导入对应路由组件**

### 3.路由表

**`src/routes/index.js`**

```js
import { Navigate } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'

// 路由映射表
const routes =  [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
    // 注意：子路由只需要写路径名称，不需要 "/" 
    children: [{ path: "student", element: <Student /> }],
  },
  // 路由重定向
  {
    path: '/',
    element: <Navigate to='/home'/>
  }
]

export default routes
```

**`App.js`**

```jsx
import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
// 导入编写好的路由映射表
import routes from './routes'

export default function App() {
  return (
    <div>
		<div className="list-group">
            {/* 设置路由链接 */}
            <NavLink className='list-group-item' to="/about">About</NavLink>
            <NavLink className='list-group-item' to="/home">Home</NavLink>
          </div>
          <div className="panel-body">
              {/* 注册路由 */}
              {/* 调用 useRoutes() hooks，嵌入路由映射表 */}
              {useRoutes(routes)}
          </div>
     </div>
  )
}
```

**其他:**

- 使用`NavLink`进行路由链接
- 使用`Outlet`进行占位

### 4.路由传参

#### 1.params参数

- 在路径后面用/进行拼接
- 在路由表中定义接收路由参数
- 对应组件使用`useParams()`接受参数

**传参组件:**

```js
<Link to={`detail/${m.id}/${m.title}/${m.content}`}>{m.title}</Link>
```

**路由表:**

```js
{path: 'detail/:id/:title/:content', element: <Detail/>}
```

**对应组件:**

```js
import {useParams } from 'react-router-dom'

const { id, title, content } = useParams()
```

#### 2.search参数

- 传递params参数,在路径后面用`/`进行拼接
- 对应组件使用`useSearchParams`接受参数

**传参组件:**

```js
<Link to={`detail?id=${m.id}&title=${m.title}&content=${m.content}`}>{m.title}</Link>
```

**接受参数:**

```js
import { useLocation, useSearchParams } from 'react-router-dom'

const [search, setSearch] = useSearchParams()

 // 通过 get('search') 方法，获取 search 参数
  const id = search.get('id')
  const title = search.get('title')
  const content = search.get('content')
```

#### 3.state参数:

- 传递params参数,在后面用/进行拼接
- 对应组件使用`useLocation`接收参数

**传参组件:**

```js
<Link to='detail' state={{id:m.id, title:m.title, content:m.content}}>{m.title}</Link>
```

**接受组件:**

```js
import { useLocation } from 'react-router-dom'

//连续解构赋值得到参数
const { state: { id, title, content } } = useLocation()
```

### 5.编程式导航

**使用`useNavigate():`**

*仅支持 replace 和 state 属性，replace表示跳转的模式，state表示传递的state参数*

**传参组件:**

```js
 function showDetail(m) {
    navigate('detail', {
      replace: true,
      state: {
        id: m.id,
        title: m.title,
        content: m.content
      }
    })
  }
```

**接受组件:**

使用`useLocation`进行接受
