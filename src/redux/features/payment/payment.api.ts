/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/order`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),

    getSinglePayment: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetAllPaymentQuery,
  useGetSinglePaymentQuery,
  useCreateOrderMutation,
} = paymentApi;
