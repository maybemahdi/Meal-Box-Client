/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/review`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["review"],
    }),
    getSingleReview: builder.query({
      query: (id) => ({
        url: `/review/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),

    createReview: builder.mutation({
      query: (data) => {
        return {
          url: "/review",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["review", "meal"],
    }),
  }),
});

export const {useCreateReviewMutation} = reviewApi;
