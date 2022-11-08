import { createSlice } from "@reduxjs/toolkit";

//createSlice 创建reducer的切片
const stuSlice = createSlice({
  name: "stu", //自动生成action中的type
  initialState: {
    name: "李四",
    age: 18,
    gender: "男",
    address: "重庆",
  },
  reducers: {
    //指定state的各种操作,直接在对象中添加方法
    setStudentName(state, action) {
      //state是一个代理对象,可以直接修改
      state.name = action.payload.name;
    },
    setStudentAge(state, action) {
      state.age = action.payload.age;
    },
  },
});

const schSlice = createSlice({
  name: "school",
  initialState: {
    name: "cqupt",
    address: "重庆",
  },
  reducers: {
    setSchoolName(state, action) {
      state.name = action.payload.name;
    },
    setSchoolAddress(state, action) {
      state.address = action.payload.address;
    },
  },
});

//结构导出方法
export const { setStudentAge, setStudentName } = stuSlice.actions;
export const { setSchoolName, setSchoolAddress } = schSlice.actions;
//切片对象会自动生成action
export { stuSlice, schSlice };
