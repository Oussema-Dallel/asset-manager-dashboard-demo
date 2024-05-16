/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { Model } from './Model';
import { type FunctionComponent, type ReactElement, Suspense } from 'react';
import { Html, OrbitControls } from '@react-three/drei';

interface ViewerProps {
	readonly modelSrc: string;
}

const Viewer: FunctionComponent<ViewerProps> = ({ modelSrc }): ReactElement => {
	return (
		<Canvas camera={{ position: [ 0, 0, 1 ] }}>
			<ambientLight intensity={ 0.2 } />
			<directionalLight
				color="red"
				position={ [ 0, 0, 5 ] }
			/>
			<Suspense
				fallback={
					<Html>
						<h1>loading ...</h1>
					</Html>
				}
			>
				<Model
					src={ modelSrc }
				/>
			</Suspense>
			<OrbitControls
				autoRotate
				enableDamping
			/>
		</Canvas>
	);
};

/* eslint-enable react/no-unknown-property */

export { Viewer };