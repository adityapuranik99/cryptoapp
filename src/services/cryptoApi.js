import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// setting headers
// replace these keys with env variables
const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '86b6c64db3mshb5f80709c348730p1f4332jsna8998ef9a64f'
}

const baseUrl  = 'https://coinranking1.p.rapidapi.com'

// to make the query request we need to pass headers
// adding headers and url to our call
const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
        // what is this reducer for
        reducerPath:'cryptoApi',
        baseQuery: fetchBaseQuery({ baseUrl }),
        endpoints: (builder) => ({
            getCryptos: builder.query({
                query: (count) => createRequest(`/coins?limit=${count}`)
            }),
            getCryptoDetails: builder.query({
                query: (coinId) => createRequest(`/coin/${coinId}`),
            }),
            getCryptoHistory: builder.query({
                query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history/${timeperiod}`),
            })
        })
})

export const {
    // redux tool kit create a hook, which we can call to get the data
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;

// we first created a store for redux
// then passed to index.js using a Provider
// we then went on to wrap our App in the Provider
// We created an API for getting the data
// Now we need to find a way to connect the API to the store
// contextApi, promises, axios, async wait
