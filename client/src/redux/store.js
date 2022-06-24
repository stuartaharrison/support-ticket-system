import { configureStore } from "@reduxjs/toolkit";
import { ticketSystemApi } from "./api";

export default configureStore({
    reducer: {
        [ticketSystemApi.reducerPath]: ticketSystemApi.reducer
    },
    middleware: (gDm) => gDm().concat(ticketSystemApi.middleware) 
});