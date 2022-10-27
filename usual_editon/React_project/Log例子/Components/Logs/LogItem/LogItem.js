import React, { useState } from "react";
import MyDate from "./MyDate/MyDate";
import "./LogItem.css";
import Card from "../../UI/Card/Card";
//引入自定义的删除组件
import ConfirmModal from "../../UI/ConfirmModal/ConfirmModal";

const LogItem = (props) => {
  // 添加一个state，记录是否显示确认窗口
  const [showConfirm, setShowConfirm] = useState(false);
  //删除
  const deleteItemHandler = () => {
    setShowConfirm(true);
  };
  //取消函数
  const cancelHandler = () => {
    setShowConfirm(false);
  };

  // 确认函数
  const okHandler = () => {
    props.onDelLog();
  };

  return (
    <Card className="item">
      {showConfirm && (
        <ConfirmModal
          confirmText="该操作不可恢复！请确认"
          onCancel={cancelHandler}
          onOk={okHandler}
        />
      )}
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
