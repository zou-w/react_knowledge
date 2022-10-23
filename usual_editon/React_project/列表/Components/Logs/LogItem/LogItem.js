import React from "react";
import MyDate from "./MyDate/MyDate";
import "./LogItem.css";

const LogItem = (props) => {
  const { date, desc, time } = props;
  return (
    <div className="item">
      <MyDate date={date} />
      {/* 日志内容的容器 */}
      <div className="content">
        <h2 className="desc">{desc}</h2>
        <div className="time">{time}</div>
      </div>
    </div>
  );
};

export default LogItem;
