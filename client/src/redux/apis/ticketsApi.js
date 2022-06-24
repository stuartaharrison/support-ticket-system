import { ticketSystemApi } from "../api";

const buildFetchQuery = ({ page = 1, limit = 25, sort = "submittedDate desc", ...rest }) => {
    let query = `tickets?page=${page}&limit=${limit}&sort=${sort}`;
    Object.keys(rest).forEach((key, i) => {
        query += `&${key}=${rest[key]}`;
    });
    return query;
}

const ticketsApi = ticketSystemApi.enhanceEndpoints({
    addTagTypes: ['Tickets', 'TicketSummary']
}).injectEndpoints({
    endpoints: (builder) => ({
        countTickets: builder.query({
            query: (args) => 'tickets/count',
            providesTags: (result, err, arg) => [{ type: 'TicketSummary', id: 'SUMMARY' }]
        }),
        createTicket: builder.mutation({
            query: ({ ...data }) => {
                return {
                    url: 'tickets',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['Tickets', 'TicketSummary']
        }),
        fetchTickets: builder.query({
            query: (args) => buildFetchQuery(args),
            providesTags: (result, error, args) =>
                result
                    ? [
                        ...result.results.map(({ _id }) => ({ type: 'Tickets', id: _id })), 
                        { type: 'Tickets', id: 'PARTIAL-LIST' }
                    ]
                    : [{ type: 'Tickets', id: 'PARTIAL-LIST' }]
        }),
        getTicket: builder.query({
            query: (ticketId) => `tickets/${ticketId}`,
            providesTags: ({ _id }) => [{ type: 'Tickets', id: _id }]
        }),
        patchTicket: builder.mutation({
            query: ({ id, operations }) => {
                return {
                    url: `tickets/${id}`,
                    method: 'PATCH',
                    body: operations
                }
            },
            invalidatesTags: ['Tickets', 'TicketSummary']
        })
    })
});

export const {
    useCountTicketsQuery,
    useCreateTicketMutation,
    useFetchTicketsQuery,
    useGetTicketQuery,
    usePatchTicketMutation
} = ticketsApi;