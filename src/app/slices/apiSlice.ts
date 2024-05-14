import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api-inference.huggingface.co/models/' }),
	endpoints: () => ({}),
});

export { apiSlice };