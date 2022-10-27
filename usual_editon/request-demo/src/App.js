import React, { useCallback, useEffect, useState } from "react";
import StudentList from "./components/StudentList";
import "./App.css";
import StuContext from "./store/StuContext";
import useFetch from "./hooks/useFetch";

const App = () => {
  return (
    <div className="app">
      <button>加载数据</button>
      <StudentList />
    </div>
  );
};
export default App;
