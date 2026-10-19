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
      { id: string; name: string; email: string; organization: { id: string; name: string; slug: string; role: "owner" | "admin" | "member"; } | null },
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
    getMyTeams: builder.query<
      {
        id: string;
        name: string;
        organizationId: string;
      }[],
      void
    >({
      query: () => "/team-membership/me/teams",
    }),

    getTeamMembers: builder.query<
      {
        id: string;
        name: string;
        email: string;
      }[],
      { teamId: string }
    >({
      query: ({ teamId }) => `/team-membership/${teamId}/members`,
    }),

    getServiceList: builder.query<
      {
        id: string;
        name:string;
        kind: 'api' | 'worker' | 'wep-app' | 'library';
        teamId: string;
        organizationId: string;
        description: string;
      }[],{teamId:string}
    >({
      query: ({teamId}) => `/services/${teamId}`
    }),

    createService: builder.mutation<
      {
        id: string;
        name:string;
        kind: 'api' | 'worker' | 'web-app' | 'library';
        teamId: string;
        organizationId: string;
        description: string;
      },
      CreateServiceInput
    >({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      })
    }),

  }),
});

export type CreateServiceInput = {
  teamId: string;
  name: string;
  description?: string;
  kind: 'api' | 'worker' | 'web-app' | 'library';
}

export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetMyTeamsQuery,
  useGetTeamMembersQuery,
  useGetServiceListQuery,
  useCreateServiceMutation
} = api;
