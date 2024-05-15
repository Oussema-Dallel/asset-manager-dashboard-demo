import { ControlledTextField } from '../../../../app/components/ControlledTextField';
import { ImagesInput } from './ImagesInput';
import { Typography } from '@mui/material';
import { useForm } from '../../../../app/hooks/form/useForm';
import { useInput } from '../../../../app/hooks/form/useInput';
import { type FunctionComponent, type ReactElement, useCallback } from 'react';

const AssetGeneratorForm: FunctionComponent = (): ReactElement => {
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
	});

	const form = useForm([ assetName, description ]);

	const handleBeginGeneration = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		if (!form.isValid) {
			return;
		}

		// TODO: Implement asset generation asyncThunk
	}, [ form ]);

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
					error={ assetName.errorMessage?.message }
					fieldName='assetName'
					label='Asset Name'
					onBlur={ assetName.handleShowErrors }
					onChange={ assetName.handleValueChange }
					required
					value={ assetName.value }
				/>
				<ControlledTextField
					fieldName='description'
					label='Description'
					multiline
					onChange={ description.handleValueChange }
					value={ description.value }
				/>
				<ImagesInput files={ files } />
			</form>
		</>
	);
};

export { AssetGeneratorForm };