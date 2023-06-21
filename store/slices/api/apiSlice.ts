import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import axiosBaseQuery from "@/store/slices/api/axiosBaseQuery";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery(),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: () => ({})
});
