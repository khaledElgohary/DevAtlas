import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<
        {id:string, name:string, email:string},
        void
    >({
        query: () => '/auth/me',
        providesTags: ['Auth']
    })
  }),
});

export const {useGetCurrentUserQuery} = api