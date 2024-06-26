import { Grid } from '@mui/material';
import type { ComponentType, FunctionComponent, ReactElement } from 'react';

interface AppContainerProps {
	/* eslint-disable @typescript-eslint/naming-convention */
	readonly Content: ComponentType;
	readonly SideBar: ComponentType;
}

const AppContainer: FunctionComponent<AppContainerProps> = ({ SideBar, Content }): ReactElement => {
	return (
		<Grid container>
			<Grid
				item
				maxWidth={ 300 }
			>
				<SideBar />
			</Grid>
			<Grid
				item
				xs={ 9 }
			>
				<Content />
			</Grid>
		</Grid>
	);
};
/* eslint-enable @typescript-eslint/naming-convention */

export { AppContainer };