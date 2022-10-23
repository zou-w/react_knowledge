import Logs from "./Components/Logs/Logs";
import LogsForm from "./Components/LogsForm/LogsForm";
import "./App.css";
import { useState } from "react";

const App = () => {
  // 模拟一组从服务器中加载的数据
  const [logsData, setLogsData] = useState([
    {
      id: "001",
      date: new Date(2021, 1, 20, 18, 30),
      desc: "学习九阳神功",
      time: 30,
    },
    {
      id: "002",
      date: new Date(2022, 2, 10, 12, 30),
      desc: "学习降龙十八掌",
      time: 20,
    },
    {
      id: "003",
      date: new Date(2022, 2, 11, 11, 30),
      desc: "学习JavaScript",
      time: 40,
    },
    {
      id: "004",
      date: new Date(2022, 2, 15, 10, 30),
      desc: "学习React",
      time: 80,
    },
  ]);

  //子向父组件传值需要函数
  //添加
  const saveLogHandler = (newLog) => {
    newLog.id = Date.now() + "";
    setLogsData([newLog, ...logsData]);
  };
  //删除
  const delLogByIndex = (index) => {
    setLogsData((prevState) => {
      const newLog = [...prevState];
      newLog.splice(index, 1);
      return newLog;
    });
  };
  return (
    <div className="app">
      {/*引入LogsFrom*/}
      <LogsForm onSaveLog={saveLogHandler} />
      <Logs logsData={logsData} onDelLog={delLogByIndex} />
    </div>
  );
};

// 导出App
export default App;
