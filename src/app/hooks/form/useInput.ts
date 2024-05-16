import type { Input } from './Input';
import { useState } from 'react';

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