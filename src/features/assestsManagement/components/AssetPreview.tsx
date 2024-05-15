import type { Asset } from '../types/Asset';
import { CardButton } from './CardButton';
import { DeleteConfirmation } from './DeleteConfirmation';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { type FunctionComponent, type ReactElement, useCallback, useState } from 'react';

const AssetPreview: FunctionComponent<Partial<Asset> & Pick<Asset, 'assetId' | 'name'>> = ({ thumbnail = 'no image', assetId, name }): ReactElement => {
	const [ isDeleteConfirmationOpen, setIsDeleteConfirmationOpen ] = useState<boolean>(false);
	const navigate = useNavigate();
	const onHandleViewAssetClicked = useCallback((): void => {
		navigate(`/assets-manager/${ assetId }`);
	}, [ assetId, navigate ]);

	const onHandleDeleteCanceled = useCallback((): void => {
		setIsDeleteConfirmationOpen(false);
	}, []);

	const onHandleDeleteButtonClicked = useCallback((): void => {
		setIsDeleteConfirmationOpen(true);
	}, []);

	return (
		<>
			<Card sx={{ maxWidth: 345, width: '100%' }}>
				<CardMedia
					image={ thumbnail }
					sx={{ height: 200 }}
					title={ name }
				/>
				<CardContent>
					<h4>{ name }</h4>
				</CardContent>
				<CardActions>
					<CardButton
						buttonText='View'
						handleButtonClicked={ onHandleViewAssetClicked }
						size="small"
						variant='outlined'
					/>
					<CardButton
						buttonText="Delete"
						handleButtonClicked={ onHandleDeleteButtonClicked }
						size="small"
						variant='contained'
					/>
				</CardActions>
			</Card>
			<DeleteConfirmation
				assetToDelete={{ name, assetId }}
				handleDeleteCanceled={ onHandleDeleteCanceled }
				isOpen={ isDeleteConfirmationOpen }
			/>
		</>
	);
};

export { AssetPreview };