//使用RTK构建store
import { configureStore } from "@reduxjs/toolkit";
//引入reducer
import { stuSlice, schSlice } from "./reducer";
import studentApi from "./studentApi";

//store统一管理
//reducer统一操作

//创建store
const store = configureStore({
  reducer: {
    student: stuSlice.reducer,
    school: schSlice.reducer,
    //RTKQ
    [studentApi.reducerPath]: studentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});

export default store;
