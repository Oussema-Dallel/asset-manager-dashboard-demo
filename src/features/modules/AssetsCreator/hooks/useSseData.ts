import { useEffect, useState } from 'react';

interface UseSseDataProps {
	streamingUrl: string;
}

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