import type { Input } from '../../../../app/hooks/form/Input';
import PublishIcon from '@mui/icons-material/Publish';
import { Card, CardContent, Grid, styled } from '@mui/material';
import { type FunctionComponent, type ReactElement, useCallback } from 'react';

interface ImagesInputProps {
	readonly files: Input<FileList | null>;
	readonly isInputDisabled: boolean;
}

const VisuallyHiddenInput = styled('input')`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	bottom: 0;
	left: 0;
	white-space: nowrap;
	width: 1px
`;

const ImagesInput: FunctionComponent<ImagesInputProps> = ({ files, isInputDisabled = false }): ReactElement => {
	const handleFilesChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
		const currentFiles = event.target.files;

		files.handleValueChange(currentFiles);
	}, [ files ]);

	return (
		<Card
			component="label"
			sx={
				{
					display: 'flex',
					cursor: 'pointer',
					padding: 2,
					borderRadius: 1,
					border: '1px dashed',
					borderColor: 'primary.main',
					justifyContent: 'center',
					alignItems: 'center',
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'&:hover': {
						borderColor: 'primary.dark',
					},
					width: 350,
					height: 200,
				}
			}
			tabIndex={ -1 }
		>
			<CardContent>
				<Grid
					alignItems="center"
					container
					flexDirection="column"
				>
					<PublishIcon />
					Select Images for Asset Generation
				</Grid>
				<VisuallyHiddenInput
					disabled={ isInputDisabled }
					multiple
					onChange={ handleFilesChange }
					type="file"
				/>
			</CardContent>
		</Card>
	);
};

export { ImagesInput };