import React, { forwardRef } from 'react';
import styles from './SideNav.module.css';
import { NavLink, useLocation } from 'react-router-dom';

import DashboardIcon from '../../atoms/DashboardIcon';
import BoltIcon from '../../atoms/BoltIcon';
import FireIcon from '../../atoms/FireIcon';
import WaterIcon from '../../atoms/WaterIcon';

const activeClass = ({ isActive }) => isActive ? styles.isActive : undefined;

const SideNav = ({ isOpen = false }, ref) => {
	const location = useLocation();

	return (
		<div className={`${styles.wrapper}${isOpen ? ` ${styles.isOpen}` : ''}`}>
			<div className={`${styles.container}${isOpen ? ` ${styles.isOpen}` : ''}`} ref={ref}>
				<nav>
					<NavLink to="/" className={location.pathname === '/' ? styles.isActive : undefined}><DashboardIcon /><span>Dashboard</span></NavLink>
					<NavLink to="/electricity" className={activeClass}><BoltIcon /><span>Electricity</span></NavLink>
					<NavLink to="/gas" className={activeClass}><FireIcon /><span>Gas</span></NavLink>
					<NavLink to="/water" className={activeClass}><WaterIcon /><span>Water</span></NavLink>
				</nav>
			</div>
		</div>
	);
};

export default forwardRef(SideNav);