import type { DefaultBodyType, HttpHandler, PathParams } from 'msw';
import { http, HttpResponse } from 'msw';

const handlers: HttpHandler[] = [
	http.get<PathParams, DefaultBodyType, { message: string }>('/test', () => {
		return HttpResponse.json({ message: 'Hello Mocked World!' });
	}),
];

export { handlers };