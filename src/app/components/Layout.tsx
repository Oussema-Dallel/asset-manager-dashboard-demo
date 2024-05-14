import { Outlet } from 'react-router-dom';
import type { FunctionComponent, ReactElement } from 'react';

const Layout: FunctionComponent = (): ReactElement => {
	return (<Outlet />);
};

export { Layout };