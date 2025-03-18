/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const orderCustomerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersForCustomer: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/order/get-orders-for-customer`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),

    getSingleOrderForCustomer: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useGetOrdersForCustomerQuery, useGetSingleOrderForCustomerQuery } =
  orderCustomerApi;
