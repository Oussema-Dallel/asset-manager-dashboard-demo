import { ControlledTextField } from '../../../../app/components/ControlledTextField';
import { generateAsset } from '../store/effects/generateAsset';
import { ImagesInput } from './ImagesInput';
import { useForm } from '../../../../app/hooks/form/useForm';
import { useInput } from '../../../../app/hooks/form/useInput';
import type { AppDispatch, AppState } from '../../../../store/store';
import { Button, Typography } from '@mui/material';
import { type FunctionComponent, type ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AssetGeneratorForm: FunctionComponent = (): ReactElement => {
	const dispatch = useDispatch<AppDispatch>();
	const assetGenerationData = useSelector((state: AppState) => state.assetsCreatorSlice);
	const isUplaodingImages = assetGenerationData.isImagesUploading;
	const isAssetGenerationLoading = assetGenerationData.isAssetsGenerationLoading;

	const isFormElementDisabled = isUplaodingImages || isAssetGenerationLoading;
	const assetName = useInput<string>({
		showErrorsImmediately: false,
		initialValue: '',
		validate: (data: string): Error | undefined => {
			if (data === '') {
				return new Error('Asset name is required');
			}
		},
	});

	const description = useInput<string>({
		initialValue: '',
	});

	const files = useInput<FileList | null>({
		initialValue: null,
		validate: (data: FileList | null): Error | undefined => {
			if (!data || data.length === 0) {
				return new Error('At least one image is required');
			}
		},
	});

	const form = useForm([ assetName, description, files ]);

	const handleBeginGeneration = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		if (!form.isValid) {
			return;
		}

		// Begin asset generation process
		void dispatch(
			generateAsset(
				{
					assetDescription: description.value,
					assetName: assetName.value,
					// @ts-expect-error as this point the form is validated
					images: files.value,
				},
			),
		);
	}, [ assetName.value, description.value, dispatch, files.value, form.isValid ]);

	return (
		<>
			<Typography variant='h3'>
				Asset Generator Form
			</Typography>
			<Typography variant='body1'>
				Please select images from your computer to be taken into account for the assets generation process
			</Typography>
			<form
				noValidate
				onSubmit={ handleBeginGeneration }
			>
				<ControlledTextField
					autoFocus={ true }
					disabled={ isFormElementDisabled }
					error={ assetName.errorMessage?.message }
					fieldName='assetName'
					label='Asset Name'
					onBlur={ assetName.handleShowErrors }
					onChange={ assetName.handleValueChange }
					required
					value={ assetName.value }
				/>
				<ControlledTextField
					disabled={ isFormElementDisabled }
					fieldName='description'
					label='Description'
					multiline
					onChange={ description.handleValueChange }
					value={ description.value }
				/>
				<ImagesInput
					files={ files }
					isInputDisabled={ isFormElementDisabled }
				/>
				<Button
					color='primary'
					disabled={ isFormElementDisabled }
					role='submit'
					sx={{ marginTop: 2 }}
					type='submit'
					variant='contained'
				>
					Generate
				</Button>
			</form>
		</>
	);
};

export { AssetGeneratorForm };