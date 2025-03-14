/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const customerProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCustomerProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/user/update-customer-profile",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUpdateCustomerProfileMutation } = customerProfileApi;
