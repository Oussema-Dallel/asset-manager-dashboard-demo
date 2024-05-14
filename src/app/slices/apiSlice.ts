import { axiosBaseQuery } from '../utils/apiClient/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: axiosBaseQuery({ baseUrl: 'https://api-inference.huggingface.co/models/' }),
	endpoints: () => ({}),
});

export { apiSlice };