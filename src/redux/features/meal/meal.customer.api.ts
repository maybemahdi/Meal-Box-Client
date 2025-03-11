/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const customerMealApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMeal: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/meal`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["meal"],
    }),
    getSingleMeal: builder.query({
      query: (id) => ({
        url: `/meal/${id}`,
        method: "GET",
      }),
      providesTags: ["meal"],
    }),
  }),
});

export const {
  useGetAllMealQuery,
  useGetSingleMealQuery,
} = customerMealApi;
