import type { AppDispatch } from '../../../../store/store';
import { getGeneratedAssetOutput } from '../store/effects/getGeneratedAssets';
import { useDispatch } from 'react-redux';
import { useSseData } from '../hooks/useSseData';
import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { type FunctionComponent, useEffect, useState } from 'react';

const AssetGenerationProgress: FunctionComponent = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [ currentMessage, setCurrentMessage ] = useState<string | undefined>(undefined);
	const { data: messages } = useSseData<string>({ streamingUrl: 'asset-generatior-progress' });

	useEffect(() => {
		if (currentMessage === 'done') {
			void dispatch(getGeneratedAssetOutput());
		}
		if (messages.length > 0) {
			const lastMessage = messages.at(-1);

			setCurrentMessage(lastMessage);
		}
	}, [ currentMessage, dispatch, messages ]);

	return (
		<Card sx={{ display: 'flex', width: 500, height: 400, justifyContent: 'center', alignItems: 'center' }}>
			<CardContent>
				<Grid
					alignItems="center"
					container
					flexDirection="column"
				>
					<CircularProgress />
					<Typography>
						{ currentMessage }
					</Typography>
				</Grid>
			</CardContent>
		</Card>
	);
};

export { AssetGenerationProgress };