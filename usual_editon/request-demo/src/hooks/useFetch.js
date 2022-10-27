import { useCallback, useReducer, useState } from "react";

//定义一个对象接受变量
/**
 * reqObj{
 *  url
 *  method
 *  data
 * }
 */

/**
 * 返回格式
 * {
    "data": [
        {
            "id": 1,
            "attributes": {
                "name": "张三",
                "gender": "男",
                "address": "重庆",
                "age": 20,
                "createdAt": "2022-10-25T09:59:59.687Z",
                "updatedAt": "2022-10-25T10:29:48.203Z",
                "publishedAt": "2022-10-25T10:00:03.640Z"
            }
        },
    ]
}
 * 
 */
export default function useFetch(reqObj) {
  //接受数据
  const [data, setData] = useState([]);
  //showLoading状态
  const [loading, setLoading] = useState(false);
  //请求错误状态
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (body) => {
    console.log(body);
    const res = await fetch(
      //http://47.108.214.227:1337/api/students?id=1
      "http://47.108.214.227:1337/api" + body.url,
      {
        method: reqObj.method || "get",
        headers: {
          "Content-type": "application/json",
        },
        body: body ? JSON.stringify({ data: body }) : null,
      }
    );
    //判断请求成功
    if (res.ok) {
      const data = await res.json();
      setData(data.data);
    } else {
      throw new Error("请求出错");
    }
  });
  return { data, fetchData };
}
