import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketSystemApi = createApi({
    reducerPath: 'ticketSystemApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/'
    }),
    endpoints: () => ({})
});