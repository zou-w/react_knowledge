import React from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function About() {
  const [search] = useSearchParams();
  const id = search.get("id");
  const title = search.get("title");
  const content = search.get("content");
  //编程式路由导航
  const navigate = useNavigate();
  const showMessage = () => {
    navigate("message", {
      replace: true,
      state: {
        id: id,
        title: title,
        content: content,
      },
    });
  };

  return (
    <div>
      <h2>列表</h2>
      <ul>
        <li>{id}</li>
        <li>{title}</li>
        <li>{content}</li>
      </ul>
      <NavLink to="/about/student">去学生组件</NavLink>
      <br />
      <button onClick={showMessage}>点我去message</button>
      <Outlet />
    </div>
  );
}
