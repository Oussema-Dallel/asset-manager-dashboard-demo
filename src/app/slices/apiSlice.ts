import { axiosBaseQuery } from '../utils/apiClient/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: axiosBaseQuery({ baseUrl: '/' }),
	endpoints: () => ({}),
});

export { apiSlice };