import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://47.108.214.227:1337/api/",
  }),
  endpoints(build) {
    return {
      getStudents: build.query({
        query() {
          return "students";
        },
      }),
      getStudentById: build.query({
        query(id) {
          return `students/${id}`;
        },
      }),
    };
  },
});

export const { useGetStudentsQuery, useGetStudentByIdQuery } = studentApi;

export default studentApi;
