import React, { useRef, useState } from "react";
import "./App.css";
export default function App() {
  const [counter, setCounter] = useState(0);
  const myDiv = useRef();

  const addCount = () => {
    setCounter((preCounter) => preCounter + 1);
  };
  const subCount = () => {
    setCounter((preCounter) => preCounter - 1);
  };
  const changeName = () => {
    console.log(myDiv.current);
    myDiv.current.innerText = "嘻嘻！";
  };
  return (
    <div>
      <div className="count" ref={myDiv}>
        {counter}
      </div>
      <button onClick={addCount}>+1</button>
      <button onClick={subCount}>-1</button>
      <button onClick={changeName}>点我</button>
    </div>
  );
}
