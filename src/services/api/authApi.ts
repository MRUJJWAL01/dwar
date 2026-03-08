import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export type AuthUser = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  verified: boolean;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  endpoints: builder => ({
    requestOtp: builder.mutation<
      { ok: boolean; message: string },
      { identifier: string }
    >({
      query: body => ({
        url: '/auth/request-otp',
        method: 'POST',
        body,
      }),
    }),

    verifyOtp: builder.mutation<
      {
        ok: boolean;
        accessToken: string;
        refreshToken: string;
        user: AuthUser;
      },
      { identifier: string; code: string }
    >({
      query: body => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),

    deviceRegistrationRequestOtp: builder.mutation<
      { ok: boolean; message: string },
      { name: string; email: string; phone: string }
    >({
      query: body => ({
        url: '/auth/device-registration-request-otp',
        method: 'POST',
        body,
      }),
    }),

    deviceRegistrationVerifyOtp: builder.mutation<
      {
        ok: boolean;
        accessToken: string;
        refreshToken: string;
        user: AuthUser;
      },
      { identifier: string; code: string }
    >({
      query: body => ({
        url: '/auth/device-registration-verify-otp',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),

    resendOtp: builder.mutation<
      { ok: boolean; message: string },
      { identifier: string }
    >({
      query: body => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<{ ok: boolean }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    me: builder.query<{ ok: boolean; user: AuthUser }, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Me'],
    }),
  }),
});

export const {
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useDeviceRegistrationRequestOtpMutation,
  useDeviceRegistrationVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutMutation,
  useMeQuery,
  useLazyMeQuery,
} = authApi;