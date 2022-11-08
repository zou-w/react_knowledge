import { Navigate } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home";
import Student from "../components/Student";
import Message from "../components/Message";

const routes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
    children: [
      { path: "student", element: <Student /> },
      { path: "message", element: <Message /> },
    ],
  },
  //重定向
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
];

export default routes;
