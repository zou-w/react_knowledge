import React, { useCallback, useContext, useState } from "react";
import StuContext from "../store/StuContext";
import StudentForm from "./StudentForm";
import useFetch from "../hooks/useFetch";

const Student = (props) => {

  return (
    <>
      <tr>
        <td>张三</td>
        <td>男</td>
        <td>20</td>
        <td>长青</td>
        <td>
          <button>删除</button>
          <button>修改</button>
        </td>
      </tr>
    </>
  );
};

export default Student;
