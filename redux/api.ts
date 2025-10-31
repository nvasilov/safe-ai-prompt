import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    keepUnusedDataFor: 30,
    baseQuery: fetchBaseQuery(),
    tagTypes: [],
    endpoints: () => ({})
})
