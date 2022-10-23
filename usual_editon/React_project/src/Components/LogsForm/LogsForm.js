import React, { useState } from "react";
import Card from "../UI/Card/Card";
import "./LogsForm.css";

const LogsForm = (props) => {
  //创建变量,存储表单数据
  const [formData, setFormData] = useState({
    inputDate: "",
    inputDesc: "",
    inputTime: "",
  });
  //获取数据
  const dateChangeHandler = (e) => {
    setFormData({
      ...formData,
      inputDate: e.target.value,
    });
  };
  const descChangeHandler = (e) => {
    setFormData({
      ...formData,
      inputDesc: e.target.value,
    });
  };
  const timeChangeHandler = (e) => {
    setFormData({
      ...formData,
      inputTime: e.target.value,
    });
  };
  //提交数据
  const submitDate = () => {
    const newLog = {
      date: new Date(formData.inputDate),
      desc: formData.inputDesc,
      time: +formData.inputTime,
    };
    //向父组件更新数据
    props.onSaveLog(newLog);
    // 清空表单项
    setFormData({
      inputDate: "",
      inputDesc: "",
      inputTime: "",
    });
  };
  return (
    <Card className="logs-form">
      <div>
        <div className="form-item">
          <label htmlFor="date">日期</label>
          <input
            onChange={dateChangeHandler}
            // 绑定value同步显示数据
            value={formData.inputDate}
            id="date"
            type="date"
          />
        </div>
        <div className="form-item">
          <label htmlFor="desc">内容</label>
          <input
            onChange={descChangeHandler}
            value={formData.inputDesc}
            id="desc"
            type="text"
          />
        </div>
        <div className="form-item">
          <label htmlFor="time">时长</label>
          <input
            onChange={timeChangeHandler}
            value={formData.inputTime}
            id="time"
            type="number"
          />
        </div>
        <div className="form-btn">
          <button onClick={submitDate}>添加</button>
        </div>
      </div>
    </Card>
  );
};

export default LogsForm;
