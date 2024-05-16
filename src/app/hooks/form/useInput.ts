import type { Input } from './Input';
import { useState } from 'react';

/**
 * A custom hook to handle input fields in a form. It provides a way to handle the value change, showing errors
 * and validating the data. It could be used in almost any kind of input.
 * @param args an object containing the initial value, a boolean to show errors immediately,
 * and a callback function to validate the data.
 * @returns an object containing the error message, a function to handle value change,
 * a function to handle showing errors,
 * a boolean to check if the data is valid, and the value of the data
 * @example
 * const name = useInput<string>({
 * 	showErrorsImmediately: false,
 * 	initialValue: '',
 * 	validate: (data: string): Error | undefined => {
 * 		if (data === '') {
 * 			return new Error('name is required');
 * 		}
 * 	},
 * });
 */
const useInput = <TData>(args: {
	initialValue: TData;
	showErrorsImmediately?: boolean;
	validate?: (data: TData) => Error | undefined;
}): Input<TData> => {
	const [ value, setValue ] = useState<TData>(args.initialValue);
	const [ isShowingErrors, setIsShowingErrors ] = useState<boolean>(false);
	const errorMessage = args.validate ? args.validate(value) : undefined;
	const showErrorsImmediately = args.showErrorsImmediately ?? false;
	const isValid = errorMessage === undefined;

	const showErrors = (): void => {
		setIsShowingErrors(true);
	};

	const onChange = (newValue: TData): void => {
		if (isShowingErrors && showErrorsImmediately) {
			showErrors();
		}
		setValue(newValue);
	};

	return {
		errorMessage: isShowingErrors ? errorMessage : undefined,
		handleValueChange: onChange,
		handleShowErrors: showErrors,
		isValid,
		value,
	};
};

export { useInput };