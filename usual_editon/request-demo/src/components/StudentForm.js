import React, { useCallback, useContext, useState } from "react";
import "./StudentForm.css";
import StuContext from "../store/StuContext";
import useFetch from "../hooks/useFetch";

const StudentForm = (props) => {
  return (
    <>
      <tr className="student-form">
        <td>
          <input type="text" />
        </td>
        <td>
          <select>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
        <td></td>
      </tr>
    </>
  );
};

export default StudentForm;
