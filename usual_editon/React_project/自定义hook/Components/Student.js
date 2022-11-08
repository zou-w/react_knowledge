import React, { useContext, useState } from "react";
//引入context
import { StudentContext } from "../Context/StudentContext";

import StudentForm from "./StudentForm";
//引入自定义hook
import { useFetch } from "../hook/useFetch";

export default function Student(props) {
  const { name, gender, age, address } = props.data.attributes;
  //接受context
  const ctx = useContext(StudentContext);

  //修改
  const [isEdit, setIsEdit] = useState(false);
  const {
    isLoading,
    error,
    fetchData: deleteData,
  } = useFetch({
    url: "/students/" + props.data.id,
    method: "delete",
  });

  const deleteHandler = () => {
    deleteData();
    ctx.fetchData();
  };
  const cancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <>
      {!isEdit && (
        <tr>
          <td>{name}</td>
          <td>{gender}</td>
          <td>{age}</td>
          <td>{address}</td>
          <td>
            <button onClick={deleteHandler}>删除</button>
            <button onClick={() => setIsEdit(true)}>修改</button>
          </td>
        </tr>
      )}
      {/* 修改在studentFrom中进行 */}
      {isEdit && <StudentForm data={props.data} onCancel={cancelEdit} />}

      {isLoading && (
        <tr>
          <td colSpan={5}>正在加载数据</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>删除失败</td>
        </tr>
      )}
    </>
  );
}
