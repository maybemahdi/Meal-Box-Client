/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const providerProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProviderProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/user/update-provider-profile",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUpdateProviderProfileMutation } = providerProfileApi;
