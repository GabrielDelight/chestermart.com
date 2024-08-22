import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../../cookie/getCookie";
import { baseUrl } from "../../ImageUrl/ImageUrl";
export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl(),
    prepareHeaders: (headers, { getState }) => {
      // headers.set('Access-Control-Allow-Origin', '*', )
      headers.set("Authorization", `Bearer ${getCookie()}`);
      return headers;
    },
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    // Get reports

    getRequest: builder.query({
      query: (params) => params,
      providesTags: ["post"],
    }),

    getUser: builder.query({
      query: (_id) => `/users/${_id}`,
      providesTags: ["post"],
    }),

    getWhoToFollow: builder.query({
      query: (params) => params,
      // providesTags: ["post"],
    }),

    // General post request
    postRequest: builder.mutation({
      query: (initData) => ({
        url: initData.url,
        method: "POST",
        body: initData.body,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        // credentials: "include",
      }),
      invalidatesTags: ["post"],
    }),

    ReportFilePostRequest: builder.mutation({
      query: ({ body, url }) => ({
        url: url,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["post"],
    }),
    UploadFile: builder.mutation({
      query: ({ body, url }) => ({
        url: url,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useGetRequestQuery,
  useGetWhoToFollowQuery,
  useUploadFileMutation,
  usePostRequestMutation,
  useReportFilePostRequestMutation,
  useGetUserQuery,
} = usersApi;
