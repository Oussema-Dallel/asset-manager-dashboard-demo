import { apiSlice } from '../../../../app/slices/apiSlice';
import type { Asset } from '../types/Asset';
import { CardButton } from './CardButton';
import { useDeleteAssetMutation } from '../services/assetsManagerApi';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { type FunctionComponent, type ReactElement, useCallback, useEffect } from 'react';

interface DeleteConfirmationProps {
	readonly assetToDelete: Partial<Asset> & Pick<Asset, 'assetId' | 'name'>;
	readonly handleDeleteCanceled: () => void;
	readonly isOpen: boolean;
}

const DeleteConfirmation: FunctionComponent<DeleteConfirmationProps> = (
	{
		assetToDelete,
		isOpen,
		handleDeleteCanceled: onHandleDeleteCanceled,
	},
): ReactElement => {
	// for some reason, the useAppDispatch type will break the RTK query middleware endpoints injection
	// so we use the useDispatch from react-redux instead
	const [ deleteAsset, { isLoading, isSuccess }] = useDeleteAssetMutation();
	const { name, assetId } = assetToDelete;
	const dispatch = useDispatch();

	const onHandleDeleted = useCallback((): void => {
		void (async (): Promise<void> => {
			await deleteAsset({ assetId }).unwrap();
		})();
	}, [ deleteAsset, assetId ]);

	useEffect((): void => {
		if (isSuccess) {
		// This is needed to invalidate the cache for the assets manager query and eneable its immediate refetching
		// @ts-expect-error More time needs to be spent on this to understand why the type
		// is not being inferred for the injected endpoints
			dispatch(apiSlice.util.invalidateTags([{ type: 'AssetsManager' }]));
		}
	}, [ dispatch, isSuccess ]);

	const onHandleDeleteCanceledLocal = useCallback((): void => {
		// This won't prevent the request from being sent to the server, but it
		deleteAsset({ assetId }).abort();
		onHandleDeleteCanceled();
	}, [ deleteAsset, assetId, onHandleDeleteCanceled ]);

	return (
		<Dialog
			open={ isOpen }
		>
			<DialogTitle>
				Delete Confirmation of { name }
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete this asset?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<CardButton
					buttonText='Yes'
					color='primary'
					disabled={ isLoading }
					handleButtonClicked={ onHandleDeleted }
					isLoading={ isLoading }
					variant='outlined'
				/>
				<CardButton
					buttonText='No'
					color='primary'
					handleButtonClicked={ onHandleDeleteCanceledLocal }
					variant='contained'
				/>
			</DialogActions>
		</Dialog>
	);
};

export { DeleteConfirmation };