import React, { memo, useCallback, useContext, useState } from "react";
import "./StudentForm.css";

//引入context
import { StudentContext } from "../Context/StudentContext";

import { useFetch } from "../hook/useFetch";

const StudentForm = memo((props) => {
  const ctx = useContext(StudentContext);
  const [inputData, setInputData] = useState({
    name: props.data ? props.data.attributes.name : "",
    age: props.data ? props.data.attributes.age : "",
    gender: props.data ? props.data.attributes.gender : "男",
    address: props.data ? props.data.attributes.address : "",
  });

  const {
    isLoading: loading,
    error,
    fetchData: addStudent,
  } = useFetch({
    url: "/students",
    method: "post",
  });
  const { fetchData: editData } = useFetch({
    url: props.data ? `/students/${props.data.id}` : "/students",
    method: "put",
  });

  const nameChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, name: e.target.value }));
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, gender: e.target.value }));
  };
  const ageChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, age: +e.target.value }));
  };
  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, address: e.target.value }));
  };

  const submitHandler = () => {
    addStudent(inputData);
    ctx.fetchData();
  };

  const editHandler = () => {
    editData(inputData);
    ctx.fetchData();
  };

  return (
    <>
      <tr className="student-form">
        <td>
          <input
            onChange={nameChangeHandler}
            value={inputData.name}
            type="text"
          />
        </td>
        <td>
          <select onChange={genderChangeHandler} value={inputData.gender}>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
        <td>
          <input
            onChange={ageChangeHandler}
            value={inputData.age}
            type="text"
          />
        </td>
        <td>
          <input
            onChange={addressChangeHandler}
            value={inputData.address}
            type="text"
          />
        </td>
        <td>
          {props.data && (
            <>
              <button onClick={() => props.onCancel()}>取消</button>
              <button onClick={editHandler}>确认</button>
            </>
          )}
          {!props.data && <button onClick={submitHandler}>添加</button>}
        </td>
      </tr>
      {loading && (
        <tr>
          <td colSpan={5}>添加中...</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>添加失败</td>
        </tr>
      )}
    </>
  );
});

export default StudentForm;
