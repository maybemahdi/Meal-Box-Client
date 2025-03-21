/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const providerMealApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMeal: builder.mutation({
      query: (data) => {
        return {
          url: "/meal",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["meal"],
    }),
    getAllMealByProvider: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/meal/provider`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["meal"],
    }),
    updateMeal: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/meal/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["meal"],
    }),
    deleteMeal: builder.mutation({
      query: (id) => {
        return {
          url: `/meal/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["meal"],
    }),
  }),
});

export const {
  useCreateMealMutation,
  useGetAllMealByProviderQuery,
  useUpdateMealMutation,
  useDeleteMealMutation,
} = providerMealApi;
