import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAdminCookie, getCookie } from "../../cookie/getCookie";
import { baseUrl } from "../../ImageUrl/ImageUrl";
export const adminApi = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl(),
    prepareHeaders: (headers, { getState }) => {
      // headers.set('Access-Control-Allow-Origin', '*', )
      headers.set("Authorization", `Bearer ${getAdminCookie()}`);
      return headers;
    },
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    // Get reports

    getRequestAdmin: builder.query({
      query: (params) => params,
      providesTags: ["post"],
    }),



    // General post request
    postRequestAdmin: builder.mutation({
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

   
    UploadFileAdmin: builder.mutation({
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
   useGetRequestAdminQuery,
   usePostRequestAdminMutation,
   useUploadFileAdminMutation
} = adminApi;
