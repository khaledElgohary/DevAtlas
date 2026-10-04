import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<
      { id: string; name: string; email: string },
      void
    >({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    login: builder.mutation<
      { id: string; name: string; email: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    getOrganizations: builder.query<
      {
        id: string;
        name: string;
        slug: string;
        role: 'owner' | 'admin' | 'member';
      }[],
      void
    >({
      query: () => "/organizations",
    })
  }),
});

export const { useGetCurrentUserQuery, useLoginMutation, useLogoutMutation, useGetOrganizationsQuery } =
  api;
