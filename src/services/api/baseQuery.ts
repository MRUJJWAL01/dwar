import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { API_BASE_URL } from '../../config/env';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from '../storage/tokenStorage';
import { authActions } from '../../store/slices/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async headers => {
    const token = await getAccessToken();

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    headers.set('content-type', 'application/json');
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      await clearTokens();
      api.dispatch(authActions.signedOut());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    if (
      refreshResult.data &&
      (refreshResult.data as any).accessToken
    ) {
      const newAccess = (refreshResult.data as any).accessToken as string;
      const newRefresh =
        ((refreshResult.data as any).refreshToken as string) ?? refreshToken;

      await setTokens(newAccess, newRefresh);

      api.dispatch(
        authActions.tokensUpdated({
          accessToken: newAccess,
          refreshToken: newRefresh,
        }),
      );

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      await clearTokens();
      api.dispatch(authActions.signedOut());
    }
  }

  return result;
};