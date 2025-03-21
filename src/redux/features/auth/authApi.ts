/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    loginWithGoogle: builder.mutation({
      query: (userInfo) => {
        console.log({ userInfo });
        return {
          url: "google-login",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation({
      query: (userInfo) => {
        console.log({ userInfo });
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: ({ userInfo, token }) => {
        console.log({ userInfo });
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: userInfo,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (userInfo) => {
        return {
          url: "user/me",
          method: "PATCH",
          body: userInfo,
        };
      },
      invalidatesTags: ["user"],
    }),
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    otp: builder.mutation({
      query: (userInfo) => {
        return {
          url: "users/verify-otp",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    getMe: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/user/get-me",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useOtpMutation,
  useGetMeQuery,
} = authApi;
