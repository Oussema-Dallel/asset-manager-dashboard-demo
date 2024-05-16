import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppContainer } from './AppContainer';
import { AppLink } from './AppLink';
import { AppSideBar } from './AppSideBar';
import Logo from '../../assets/icon.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, styled, SvgIcon, Toolbar, Tooltip, Typography } from '@mui/material';
import type { FunctionComponent, MouseEvent, ReactElement } from 'react';
import { pages, settings } from '../constants/ui';
import { useCallback, useState } from 'react';

const AppBarButton = styled(Button)`
	&.MuiButtonBase-root {
		:hover {
		color: ${({ theme }): string => theme.palette.primary.main};
		background-color: transparent;
		}
}`;

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const FullWidthContainer = styled(Container)`
&.MuiContainer-root {
	max-width: 100%;
}
`;

const Layout: FunctionComponent = (): ReactElement => {
	const [ anchorElementNav, setAnchorElementNav ] = useState<HTMLElement | null>(null);
	const [ anchorElementUser, setAnchorElementUser ] = useState<HTMLElement | null>(null);

	const handleOpenNavMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
		setAnchorElementNav(event.currentTarget);
	}, []);
	const handleOpenUserMenu = useCallback((event: MouseEvent<HTMLElement>) => {
		setAnchorElementUser(event.currentTarget);
	}, []);
	const handleCloseNavMenu = useCallback(() => {
		setAnchorElementNav(null);
	}, []);

	const handleCloseUserMenu = useCallback(() => {
		setAnchorElementUser(null);
	}, []);

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					boxShadow: 0,
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
			>
				<FullWidthContainer>
					<Toolbar>
						<IconButton
							LinkComponent={ AppLink }
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
							}}
						>
							<AppLink to="/">
								<SvgIcon>
									<Logo />
								</SvgIcon>
							</AppLink>
						</IconButton>
						<Box
							component="div"
							sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
						>
							<IconButton
								aria-controls="menu-appbar"
								aria-haspopup="true"
								aria-label="account of current user"
								color="inherit"
								onClick={ handleOpenNavMenu }
								size="large"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								anchorEl={ anchorElementNav }
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								id="menu-appbar"
								keepMounted
								onClose={ handleCloseNavMenu }
								open={ Boolean(anchorElementNav) }
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
							>
								{ pages.map((page) => (
									<MenuItem
										LinkComponent={ AppLink }
										key={ page }
										onClick={ handleCloseNavMenu }
									>
										<AppLink to={ page.toLowerCase() }>
											<Typography textAlign="center">{ page }</Typography>
										</AppLink>
									</MenuItem>
								)) }
							</Menu>
						</Box>
						<IconButton
							sx={{
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								justifyContent: 'start',
							}}
						>
							<AppLink to="/">
								<SvgIcon>
									<Logo />
								</SvgIcon>
							</AppLink>
						</IconButton>
						<Box
							component="div"
							sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
						>
							{ pages.map((page) => (
								<AppBarButton
									LinkComponent={ AppLink }
									key={ page }
									onClick={ handleCloseNavMenu }
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									<AppLink to={ page.toLowerCase() }>
										{ page }
									</AppLink>
								</AppBarButton>
							)) }
						</Box>

						<Box
							component="div"
							sx={{ flexGrow: 0 }}
						>
							<Tooltip title="Open settings">
								<IconButton
									onClick={ handleOpenUserMenu }
									sx={{ p: 0 }}
								>
									<Avatar>
										<AccountCircleIcon fontSize='large' />
									</Avatar>
								</IconButton>
							</Tooltip>
							<Menu
								anchorEl={ anchorElementUser }
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								id="menu-appbar"
								keepMounted
								onClose={ handleCloseUserMenu }
								open={ Boolean(anchorElementUser) }
								sx={{ mt: '45px' }}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
							>
								{ settings.map((setting) => (
									<MenuItem
										key={ setting }
										onClick={ handleCloseUserMenu }
									>
										<Typography textAlign="center">{ setting }</Typography>
									</MenuItem>
								)) }
							</Menu>
						</Box>
					</Toolbar>
				</FullWidthContainer>
			</AppBar>
			<Offset />
			<AppContainer
				Content={ Outlet }
				SideBar={ AppSideBar }
			/>
		</>
	);
};

export { Layout };