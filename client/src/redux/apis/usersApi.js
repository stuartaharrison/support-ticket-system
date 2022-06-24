import { ticketSystemApi } from "../api";

const buildFetchQuery = ({ page = 1, limit = 25, sort = "username", ...rest }) => {
    let query = `users?page=${page}&limit=${limit}&sort=${sort}`;
    Object.keys(rest).forEach((key, i) => {
        query += `&${key}=${rest[key]}`;
    });
    return query;
}

const usersApi = ticketSystemApi.enhanceEndpoints({
    addTagTypes: ['Users']
}).injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: ({ ...data }) => {
                return {
                    url: 'users',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Users']
        }),
        fetchUsers: builder.query({
            query: (args) => buildFetchQuery(args),
            providesTags: (result, error, args) =>
                result
                    ? [...result.results.map(({ _id }) => ({ type: 'Users', id: _id })), { type: 'Users', id: 'PARTIAL-LIST' }]
                    : [{ type: 'Users', id: 'PARTIAL-LIST' }]
        }),
        getUser: builder.query({
            query: (userId) => `users/${userId}`,
            providesTags: ({ _id }) => [{ type: 'Users', id: _id }]
        }),
        listUsers: builder.query({
            query: (args) => 'users/list',
            providesTags: (result, error, args) =>
                result
                    ? [...result.map(({ _id }) => ({ type: 'Users', id: _id })), { type: 'Users', id: 'PARTIAL-LIST' }]
                    : [{ type: 'Users', id: 'PARTIAL-LIST' }]
        }),
        patchUser: builder.mutation({
            query: ({ id, newPassword, operations }) => {
                return {
                    url: `users/${id}`,
                    method: 'PATCH',
                    body: {
                        newPassword,
                        operations
                    }
                }
            },
            invalidatesTags: ['Users']
        })
    })
});

export const {
    useCreateUserMutation,
    useFetchUsersQuery,
    useGetUserQuery,
    useListUsersQuery,
    usePatchUserMutation
} = usersApi;