import React, { useEffect } from "react";
import Student from "./Student";
import "./StudentList.css";
import StudentForm from "./StudentForm";
import useFetch from "../hooks/useFetch";

const StudentList = (props) => {
  const { data: stuData, fetchData } = useFetch();
  useEffect(() => {
    fetchData({ url: "/student" });
  }, []);
  return (
    <table>
      <caption>学生列表</caption>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        <Student />
      </tbody>

      <tfoot>
        <StudentForm />
      </tfoot>
    </table>
  );
};

export default StudentList;
