/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const orderProviderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersForProvider: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/order/get-orders-for-provider`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["order"],
    }),

    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useGetOrdersForProviderQuery } = orderProviderApi;
