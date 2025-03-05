/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContactMessages: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          data?.queryObj.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/contact`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["example"],
    }),
    getSingleContactMessage: builder.query({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "GET",
      }),
      providesTags: ["contact"],
    }),

    postContactMessage: builder.mutation({
      query: (data) => {
        return {
          url: "/contact",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["contact"],
    }),

    deleteContactMessage: builder.mutation({
      query: (id) => {
        return {
          url: `/contact/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  usePostContactMessageMutation,
} = contactApi;
