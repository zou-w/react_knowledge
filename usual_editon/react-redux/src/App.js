import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
} from "./store/studentApi";

//直接导入方法,减少组件内代码
import {
  setStudentAge,
  setStudentName,
  setSchoolAddress,
  setSchoolName,
} from "./store/reducer";

export default function App() {
  const { data, isSuccess, isLoading } = useGetStudentsQuery();
  const { data: stuData } = useGetStudentByIdQuery();
  const student = useSelector((state) => state.student);
  const school = useSelector((state) => state.school);
  const dispatch = useDispatch();
  const setNameHandler = () => {
    dispatch(setStudentName({ name: "刘海" }));
    dispatch(setSchoolName({ name: "重庆邮电大学" }));
  };
  const setAgeHandler = () => {
    dispatch(setStudentAge({ age: "110" }));
    dispatch(setSchoolAddress({ address: "崇文路2号" }));
  };
  return (
    <div>
      <p>{student.name}</p>
      <p>{student.age}</p>
      <button onClick={setNameHandler}>修改name</button>
      <button onClick={setAgeHandler}>修改age</button>
      <p>{school.name}</p>
      <p>{school.address}</p>
      <p>------</p>
      {isSuccess &&
        data.data.map((item) => (
          <p key={item.id}>
            {item.attributes.name} ---
            {item.attributes.age} ---
            {item.attributes.gender} ---
            {item.attributes.address}
          </p>
        ))}
    </div>
  );
}
