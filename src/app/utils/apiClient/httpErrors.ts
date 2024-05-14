import type { AxiosError, AxiosResponse } from 'axios';

const isError = (ex: unknown): ex is Error =>
	typeof ex === 'object'
	&& ex !== null
	&& 'message' in ex
	&& typeof (ex as { message: unknown }).message === 'string';

const isAxiosError = function (ex: unknown): ex is AxiosError {
	return isError(ex)
		&& 'isAxiosError' in ex
		&& (ex as { isAxiosError: unknown }).isAxiosError === true;
};

type AxiosHttpError<
	TResponse,
	TStatusCode extends number = number,
> = AxiosError<TResponse> & {
	response: AxiosResponse<TResponse> & {
		status: TStatusCode;
	};
};

type AxiosClientError = AxiosError & {
	response: undefined;
};

const isHttpError = function <TResponse = unknown>(
	error: unknown,
): error is AxiosHttpError<TResponse> {
	return isAxiosError(error) && error.response !== undefined;
};

const isClientError = (error: unknown): error is AxiosClientError =>
	isAxiosError(error) && error.response === undefined;

const isErrorOfStatus = (error: unknown, httpStatus: number): boolean =>
	isHttpError(error) && error.response.status === httpStatus;

const is401Error = <TResponse>(
	error: unknown,
): error is AxiosHttpError<TResponse, 401> => isErrorOfStatus(error, 401);

const is403Error = <TResponse>(
	error: unknown,
): error is AxiosHttpError<TResponse, 403> => isErrorOfStatus(error, 403);

const is404Error = <TResponse>(
	error: unknown,
): error is AxiosHttpError<TResponse, 404> => isErrorOfStatus(error, 404);

const is409Error = <TResponse>(
	error: unknown,
): error is AxiosHttpError<TResponse, 409> => isErrorOfStatus(error, 409);

export {
	is401Error,
	is403Error,
	is404Error,
	is409Error,
	isAxiosError,
	isClientError,
	isError,
	isHttpError,
};