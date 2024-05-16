interface Input<TData> {
	errorMessage?: Error;
	handleShowErrors: () => void;
	handleValueChange: (newValue: TData) => void;
	isValid: boolean;
	value: TData;
}

export type { Input };