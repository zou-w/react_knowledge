import React from "react";
import MyDate from "./MyDate/MyDate";
import "./LogItem.css";
import Card from "../../UI/Card/Card";

const LogItem = (props) => {
  //删除
  const deleteItemHandler = () => {
    const isDel = window.confirm("该操作不可恢复，确认吗？");
    if (isDel) {
      // 删除当前的item，要删除item，其实就是要从数据的state移除指定的数据
      // console.log(props.onDelLog);
      props.onDelLog();
    }
  };

  return (
    <Card className="item">
      <MyDate date={props.date} />
      {/* 日志内容的容器 */}
      <div className="content">
        <h2 className="desc">{props.desc}</h2>
        <div className="time">{props.time}分钟</div>
      </div>
      {/* 删除按钮 */}
      <div>
        <div onClick={deleteItemHandler} className="delete">
          ×
        </div>
      </div>
    </Card>
  );
};

export default LogItem;
