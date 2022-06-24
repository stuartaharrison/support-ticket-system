import { ticketSystemApi } from "../api";

const authApi = ticketSystemApi.enhanceEndpoints({
    addTagTypes: ['Session']
}).injectEndpoints({
    endpoints: (builder) => ({
        authenticate: builder.mutation({
            query: ({ ...data }) => {
                return {
                    url: 'authenticate',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Session']
        }),
        getSession: builder.query({
            query: () => 'authenticate',
            providesTags: ['Session'],
            transformResponse: (response, meta, arg) => {
                return response.session;
            }
        }),
        logoutSession: builder.mutation({
            query: () => {
                return {
                    url: 'authenticate',
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Session']
        })
    })
});

export const {
    useAuthenticateMutation,
    useGetSessionQuery,
    useLogoutSessionMutation
} = authApi;