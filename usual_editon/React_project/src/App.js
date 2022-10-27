import React, { useEffect } from "react";
import StudentList from "./Components/StudentList";

//引入context
import { StudentContext } from "./Context/StudentContext";
//导入自定义hook
import { useFetch } from "./hook/useFetch";

export default function App() {
  //解构
  const {
    data: stuData,
    isLoading,
    error,
    fetchData,
  } = useFetch({
    url: "/students",
  });

  useEffect(() => {
    fetchData();
  }, []);
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
