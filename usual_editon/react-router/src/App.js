import React from "react";
import { useState } from "react";
import { NavLink, useRoutes } from "react-router-dom";
//导入路由表
import routes from "./routes";

export default function App() {
  const [message] = useState([
    { id: 1, title: "message1", content: "努力学习" },
    { id: 2, title: "message2", content: "学习React" },
    { id: 3, title: "message3", content: "前端工程师" },
  ]);

  return (
    <div>
      {message.map((m) => {
        return (
          <NavLink
            key={m.id}
            style={({ isActive }) => {
              return isActive ? { backgroundColor: "yellow" } : null;
            }}
            to={`about?id=${m.id}&title=${m.title}&content=${m.content}`}
          >
            About
          </NavLink>
        );
      })}
      <NavLink to="/home">Home</NavLink>
      <div>{useRoutes(routes)}</div>
    </div>
  );
}
