import { TextField } from '@mui/material';
import { type FunctionComponent, type ReactElement, useCallback } from 'react';

interface ControlledTextFieldProps {
	readonly autoFocus?: boolean;
	readonly className?: string;
	readonly disabled?: boolean;
	readonly error?: string;
	readonly fieldName: string;
	readonly label: string;
	readonly multiline?: boolean;
	readonly onBlur?: () => void;
	readonly onChange: (value: string) => void;
	readonly placeholder?: string;
	readonly required?: boolean;
	readonly value: string;
}

const ControlledTextField: FunctionComponent<ControlledTextFieldProps> = ({
	label,
	onChange,
	onBlur: handleBlur,
	disabled,
	fieldName,
	multiline,
	required,
	placeholder,
	value,
	error,
	className,
	autoFocus,
}): ReactElement => {
	const hasError = error !== undefined;
	const isMultiline = multiline ?? false;
	const minRows = isMultiline ? 3 : 1;

	const handleValueChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
		onChange(event.target.value);
	}, [ onChange ]);

	return (
		<TextField
			autoFocus={ autoFocus }
			className={ className }
			disabled={ disabled }
			error={ hasError }
			fullWidth
			helperText={ error }
			id={ fieldName }
			label={ label }
			margin='normal'
			multiline={ isMultiline }
			name={ fieldName }
			onBlur={ handleBlur }
			onChange={ handleValueChanged }
			placeholder={ placeholder }
			required={ required }
			rows={ minRows }
			value={ value }
			variant='outlined'
		/>
	);
};

export { ControlledTextField };