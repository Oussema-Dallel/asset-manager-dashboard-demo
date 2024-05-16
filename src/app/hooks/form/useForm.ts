import type { Input } from './Input';

const useForm = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputs: Input<any>[],
): {
	isValid: boolean;
} => {
	const isValid = inputs.every((input) => input.isValid);

	return {
		isValid,
	};
};

export { useForm };