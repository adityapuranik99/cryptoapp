import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '86b6c64db3mshb5f80709c348730p1f4332jsna8998ef9a64f'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders})

export const cryptoNewsApi = createApi({
    // what is this reducer for
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ( {newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery, } = cryptoNewsApi;