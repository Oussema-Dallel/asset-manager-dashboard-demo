import type { Input } from './Input';

/**
 * A custom hook to handle a form validation.
 * @param inputs inputs of type Input to be validated
 * @returns an object containing a boolean indicating if the form is valid
 * @example const form = useForm([name, email, password]);
 * if (form.isValid) {
 * 	// submit the form
 * }
 */
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