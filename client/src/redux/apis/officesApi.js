import { ticketSystemApi } from "../api";

const officesApi = ticketSystemApi.enhanceEndpoints({
    addTagTypes: ['Offices']
}).injectEndpoints({
    endpoints: (builder) => ({
        createOffice: builder.mutation({
            query: ({ ...data }) => {
                return {
                    url: 'offices',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Offices']
        }),
        fetchOffices: builder.query({
            query: () => 'offices',
            providesTags: (result, error, args) =>
                result
                    ? [...result.map(({ _id }) => ({ type: 'Offices', id: _id }))]
                    : [{ type: 'Offices', id: 'PARTIAL-LIST' }]
        }),
        getOffice: builder.query({
            query: (officeId) => `offices/${officeId}`,
            providesTags: ({ _id }) => [{ type: 'Offices', id: _id }]
        }),
        patchOffice: builder.mutation({
            query: ({ id, operations }) => {
                return {
                    url: `offices/${id}`,
                    method: 'PATCH',
                    body: operations
                }
            },
            invalidatesTags: ['Offices']
        })
    })
});

export const {
    useCreateOfficeMutation,
    useFetchOfficesQuery,
    useGetOfficeQuery,
    usePatchOfficeMutation
} = officesApi;