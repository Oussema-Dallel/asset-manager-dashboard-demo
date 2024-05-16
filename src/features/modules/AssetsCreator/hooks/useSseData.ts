import { useEffect, useState } from 'react';

interface UseSseDataProps {
	streamingUrl: string;
}

/**
 * A custom hook to stream data from a server using Server-Sent Events (SSE). When used in component, it
 * will automatically connect to the server and start streaming data.
 * @param streamingUrl the url endpoint to stream data from
 * @returns an object containing the data and a boolean indicating
 * if the connection is open. The data is an array of the streamed data typed with the generic
 * type T provided in the function call.
 */
const useSseData = <T>({ streamingUrl }: UseSseDataProps): { data: T[]; isStreaming: boolean } => {
	const [ data, setData ] = useState<T[]>([]);
	const [ isConnectionOpen, setIsConnectionOpen ] = useState(false);

	useEffect(() => {
		const eventSource = new EventSource(streamingUrl, { withCredentials: false });

		eventSource.addEventListener('open', () => {
			setIsConnectionOpen(true);
		});

		eventSource.addEventListener('message', (event) => {
			if (event.data === null || event.data === 'done') {
				eventSource.close();
				setIsConnectionOpen(false);
			}
			setData((previousData) => [ ...previousData, event.data as T ]);
		});

		eventSource.addEventListener('error', (error) => {
			console.error(error);
			eventSource.close();
			setIsConnectionOpen(false);
		});

		return () => {
			eventSource.close();
			setIsConnectionOpen(false);
		};
	}, [ streamingUrl ]);

	return { data, isStreaming: isConnectionOpen };
};

export { useSseData };