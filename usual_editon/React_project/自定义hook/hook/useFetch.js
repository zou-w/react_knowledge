import { useCallback, useState } from "react";

//接受参数
/**
 * {
 *  method
 *  data
 *  url
 *  query
 * }
 */

const useFetch = (reqObj, id) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (body) => {
    try {
      //清除状态
      setIsLoading(true);
      setError(null);
      const res = await fetch("http://47.108.214.227:1337/api" + reqObj.url, {
        method: reqObj.method || "get",
        headers: {
          "Content-type": "application/json",
        },
        body: body ? JSON.stringify({ data: body }) : null,
      });
      if (res.ok) {
        const data = await res.json();
        //设置数据存储
        setData(data.data);
      } else {
        throw new Error("请求出错");
      }
    } catch (error) {
      //出错
      setError(error);
    } finally {
      //设置显示
      setIsLoading(false);
    }
  }, []);

  //将需要的数据返回
  return { data, isLoading, error, fetchData };
};

export { useFetch };
