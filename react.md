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
npm install react react-dom react-scripts

//打包
npx react-scripts build
//运行
npx react-scripts start
```

## 3.hook

**`useState()`:**

异步执行,当调用setState()需要用到旧state时,可能会出现计算错误

使用回调函数可以解决

```js
setCounter(preCounter => preCounter+1)
```

**`useRef()`:**

返回一个ref对象,并且保持不变,不会刷新

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

  
