import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./FilterMeals.module.css";

export default function FilterMeals(props) {
  const [currentContent, setCurrentContent] = useState("");
  //控制清空按钮的显示和隐藏
  const [showClear, setShowClear] = useState(false);
  //获取输入内容
  const inputChangeHandler = (e) => {
    const keyword = e.target.value.trim();
    if (keyword !== "") {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
    setCurrentContent(keyword);
    props.onFilter(keyword);
  };
  //清空输入内容
  const clearInput = () => {
    setCurrentContent("");
    setShowClear(false);
    props.onFilter("");
  };
  return (
    <div className={classes.FilterMeals}>
      <div className={classes.InputOuter}>
        <input
          value={currentContent}
          onChange={inputChangeHandler}
          className={classes.SearchInput}
          type="text"
          placeholder={"请输入关键字"}
        />
        <FontAwesomeIcon className={classes.SearchIcon} icon={faSearch} />
        {showClear && (
          <FontAwesomeIcon
            onClick={clearInput}
            className={classes.deleteIcon}
            icon={faDeleteLeft}
          />
        )}
      </div>
    </div>
  );
}
