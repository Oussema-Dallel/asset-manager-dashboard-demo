import axios from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

const axiosBaseQuery = (
	{ baseUrl = '' }: { baseUrl: string },
): BaseQueryFn<{
	data?: AxiosRequestConfig['data'];
	headers?: AxiosRequestConfig['headers'];
	method?: AxiosRequestConfig['method'];
	params?: AxiosRequestConfig['params'];
	url: string;
}> =>
	async ({ url, method, data, params, headers }) => {
		try {
			const result = await axios({
				url: baseUrl + url,
				method,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				data,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				params,
				headers,
			});

			return { data: result.data };
		} catch (ex) {
			const error = ex as AxiosError;

			return {
				error: {
					status: error.response?.status,
					data: (Boolean((error.response?.data))) || error.message,
				},
			};
		}
	};

export { axiosBaseQuery };