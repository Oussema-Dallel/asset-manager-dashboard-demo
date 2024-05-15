import { AppLink } from './AppLink';
import { ASSETS_CREATOR_LINK, ASSETS_MANAGER_LINK } from '../constants/ui';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import type { FunctionComponent, ReactElement } from 'react';

const AppSideBar: FunctionComponent = (): ReactElement => {
	return (
		<Drawer
			sx={{
				width: 300,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: 'inherit', boxSizing: 'border-box' },
			}}
			variant="permanent"
		>
			<Toolbar />
			<List>
				<ListItem
					disablePadding
				>
					<ListItemButton LinkComponent={ AppLink }>
						<AppLink to={ ASSETS_CREATOR_LINK }>
							<ListItemText primary="Asset Creator" />
						</AppLink>
					</ListItemButton>
				</ListItem>
				<ListItem
					disablePadding
				>
					<ListItemButton LinkComponent={ AppLink }>
						<AppLink to={ ASSETS_MANAGER_LINK }>
							<ListItemText primary="Asset Manager" />
						</AppLink>
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
};

export { AppSideBar };