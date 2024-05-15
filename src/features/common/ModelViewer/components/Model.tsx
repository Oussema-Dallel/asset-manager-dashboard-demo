import type { FunctionComponent } from 'react';
import { Splat } from '@react-three/drei';

interface ModelProps {
	readonly src: string;
}

const Model: FunctionComponent<ModelProps> = ({ src }) => {
	return (
		<Splat
			src={ src }
		/>
	);
};

export { Model };