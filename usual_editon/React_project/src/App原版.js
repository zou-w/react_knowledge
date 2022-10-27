import React, { useState, useEffect, useReducer, useCallback } from "react";
import StudentList from "./Components/StudentList";

//引入context
import { StudentContext } from "./Context/StudentContext";

export default function App() {
  const [stuData, setStuData] = useState([]);
  //显示数据正在加载中
  const [isLoading, setIsLoading] = useState(true);
  //记录错误信息
  const [error, setError] = useState(null);

  //定义一个请求函数
  const fetchData = useCallback(async () => {
    try {
      //调用前都需要将加载设置为true
      setIsLoading(true);
      // 重置错误
      setError(null);
      const res = await fetch("http://47.108.214.227:1337/api/students");
      if (res.ok) {
        const data = await res.json();
        setStuData(data.data);
      } else {
        throw new Error("请求出错");
      }
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // //调用前都需要将加载设置为true
    // setIsLoading(true);
    // // 重置错误
    // setError(null);
    // fetch("http://47.108.214.227:1337/api/students")
    //   .then((res) => {
    //     console.log(res);
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error("请求出错");
    //   })
    //   .then((data) => {
    //     setStuData(data.data);
    //     //有数据设置为false
    //     setIsLoading(false);
    //   })
    //   .catch((e) => {
    //     setIsLoading(false);
    //     setError(e);
    //   });
  }, [fetchData]);

  const loadDataHandler = () => {
    fetchData();
  };

  return (
    <StudentContext.Provider value={{ fetchData }}>
      <div className="app">
        <button onClick={loadDataHandler}>加载数据</button>

        {!isLoading && !error && <StudentList studentData={stuData} />}
        {isLoading && <p>数据正在加载中...</p>}
        {error && <p>数据加载异常！</p>}
      </div>
    </StudentContext.Provider>
  );
}
