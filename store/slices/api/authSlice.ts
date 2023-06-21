import { apiSlice } from "@/store/slices/api/apiSlice";
import { APIActionResponse, Auth, Authorize, AuthorizeResponse } from "@/types";

export const extendedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    authorize: builder.mutation<AuthorizeResponse, Authorize>({
      query: (data) => ({
        url: "/auth/authorize",
        method: "POST",
        data: data
      })
    }),
    register: builder.mutation<
      APIActionResponse<Auth>,
      {
        name: string;
        email: string;
        password: string;
        phone: string;
        phone_code: string;
      }
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data: data
      })
    }),
    forgetPassword: builder.mutation<APIActionResponse<undefined>, { email: string }>({
      query: (data) => ({
        url: "/auth/password/email",
        method: "POST",
        data: data
      })
    }),
    resetPassword: builder.mutation<
      APIActionResponse<undefined>,
      { email: string; password: string; password_confirmation: string; token: string }
    >({
      query: (data) => ({
        url: "/auth/password/reset",
        method: "POST",
        data: data
      })
    })
  })
});

export const { useAuthorizeMutation, useRegisterMutation, useForgetPasswordMutation, useResetPasswordMutation } =
  extendedApiSlice;
