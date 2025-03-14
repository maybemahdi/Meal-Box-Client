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
    updateMeal: builder.mutation({
      query: ({formData, id}) => {
        return {
          url: `/meal/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["meal"],
    }),
  }),
});

export const {useCreateMealMutation, useUpdateMealMutation} = providerMealApi;
