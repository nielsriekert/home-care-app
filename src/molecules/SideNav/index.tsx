import React, { forwardRef, LegacyRef } from 'react';
import styles from './SideNav.module.css';
import { NavLink, useLocation } from 'react-router-dom';

import DashboardIcon from '../../atoms/DashboardIcon';
import BoltIcon from '../../atoms/icons/BoltIcon';
import FireIcon from '../../atoms/icons/FireIcon';
import WaterIcon from '../../atoms/icons/WaterIcon';
import ArrowsIcon from '../../atoms/icons/ArrowsIcon';

const activeClass = ({ isActive }) => isActive ? styles.isActive : undefined;

const SideNav = ({ isOpen = false }, ref: LegacyRef<HTMLDivElement>) => {
	const location = useLocation();

	return (
		<div className={`${styles.wrapper}${isOpen ? ` ${styles.isOpen}` : ''}`}>
			<div className={`${styles.container}${isOpen ? ` ${styles.isOpen}` : ''}`} ref={ref}>
				<nav>
					<NavLink to="/" title="Dashboard" className={location.pathname === '/' ? styles.isActive : undefined}><DashboardIcon /><span>Dashboard</span></NavLink>
					<NavLink to="/electricity" title="Electricity" className={activeClass}><BoltIcon /><span>Electricity</span></NavLink>
					<NavLink to="/gas" title="Gas" className={activeClass}><FireIcon /><span>Gas</span></NavLink>
					<NavLink to="/water" title="Water" className={activeClass}><WaterIcon /><span>Water</span></NavLink>
					<NavLink to="/period-comparator" title="Period comparator" className={activeClass}><ArrowsIcon /><span>Period comparator</span></NavLink>
				</nav>
			</div>
		</div>
	);
};

export default forwardRef(SideNav);