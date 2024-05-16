import { Button, type ButtonProps, CircularProgress, styled } from '@mui/material';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';

interface CardButtonProps extends ButtonProps {
	readonly buttonIcon?: ReactElement;
	readonly buttonText: ReactNode;
	// To be able to inject custom css when using styled-components' approach
	readonly className?: string;
	readonly handleButtonClicked: () => void;
	readonly isLoading?: boolean;
}

const ButtonSpinner = styled(CircularProgress)`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -8px;
    margin-left: -12px;
`;

const CardButton: FunctionComponent<CardButtonProps> = (
	{
		handleButtonClicked,
		buttonText,
		buttonIcon,
		className,
		isLoading = false,
		...props
	},
): ReactElement => {
	return (
		<Button
			className={ className }
			onClick={ handleButtonClicked }
			{ ...props }
		>
			{ isLoading ? <ButtonSpinner size={ 16 } /> : null }
			{ buttonIcon }
            &nbsp;
			{ buttonText }
		</Button>
	);
};

export { CardButton };