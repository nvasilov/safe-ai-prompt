import {api} from "@/entrypoints/redux/api.ts";

const injectedApi = api.injectEndpoints({

    endpoints: (builder) => ({

        getLorem: builder.query<any, void>({
            query: () => ({
                url: `https://lorem-api.com/api/article/foo?format=json`,
                method: 'GET'
            }),
            keepUnusedDataFor: Infinity
        })
    })
})

export const {
    useGetLoremQuery
} = injectedApi