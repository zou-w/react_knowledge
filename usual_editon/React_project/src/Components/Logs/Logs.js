/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import Card from "../UI/Card/Card";
import "./Logs.css";

const Logs = (props) => {
  // 将数据放入JSX中
  let logItemData = props.logsData.map((item, index) => (
    <LogItem
      onDelLog={() => props.onDelLog(index)}
      key={item.id}
      date={item.date}
      desc={item.desc}
      time={item.time}
    />
  ));
  if (logItemData.length === 0) {
    logItemData = <p className="no-logs">没要找到日志！</p>;
  }

  return <Card className="logs">{logItemData}</Card>;
};

export default Logs;
