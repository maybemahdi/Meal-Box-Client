import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.access_token;
    headers.set("accept", "application/json");
    if (access_token) {
      headers.set("authorization", `${access_token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check if the request failed with a 401 (Unauthorized)
  if (result.error?.status === 401) {
    try {
      const refreshToken = (api.getState() as RootState).auth.refresh_token;
      const user = (api.getState() as RootState).auth.user;

      // If there's NO refresh token, user is likely not logged in or session is expired
      if (!refreshToken) {
        // Check if the request was for logging in (avoid refresh in this case)
        const isLoginRequest =
          typeof args === "string"
            ? args.includes("/login")
            : (args.url as string).includes("/login");

        if (isLoginRequest) {
          // Do nothing special, just return the error from the login attempt
          return result;
        }

        // Otherwise, show session expired alert and logout
        api.dispatch(logout());
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Please login again to continue",
        });
        return result;
      }

      // Make a request to refresh the token
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `${refreshToken}`,
          },
        }
      );

      const data = await res.json();

      if (data?.success) {
        api.dispatch(
          setUser({
            user,
            access_token: data.data.access_token,
            refresh_token: refreshToken,
          })
        );

        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh token fails, logout and show alert
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Please login again to continue",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Stay Logged Out",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }).then((result) => {
          api.dispatch(logout());
          signOut();
        });
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "example", "contact"],
  endpoints: () => ({}),
});
