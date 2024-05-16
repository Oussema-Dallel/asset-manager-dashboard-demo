import { AssetGenerationProgress } from './AssetGenerationProgress';
import { setIsAssetGenerationLoading } from '../store/assetsCreatorSlice';
import { Viewer } from '../../../common/ModelViewer/components/Viewer';
import type { AppDispatch, AppState } from '../../../../store/store';
import { Box, Grid } from '@mui/material';
import { type FunctionComponent, type ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AssetGeneratorOutput: FunctionComponent = (): ReactElement => {
	const dispatch = useDispatch<AppDispatch>();
	const assetGenerationData = useSelector((state: AppState) => state.assetsCreatorSlice);

	const isGeneratingAssets = assetGenerationData.isAssetsGenerationLoading;
	const generatedModel = assetGenerationData.output3dModel;
	const error = assetGenerationData.error;

	// needed to cancel long running process
	useEffect(() => {
		return () => {
			dispatch(setIsAssetGenerationLoading(false));
		};
	}, [ dispatch ]);

	return (
		<Grid
			container
			flexDirection="column"
		>
			<h1>Asset Generator Output</h1>
			{ isGeneratingAssets
				? <AssetGenerationProgress />
				: (
					error
						? <h1>Something went wrong</h1>
						: 						(
							<Box
								component="div"
								sx={{ height: 400 }}
							>
								<Viewer modelSrc={ generatedModel } />
							</Box>
						)
				) }
		</Grid>
	);
};

export { AssetGeneratorOutput };