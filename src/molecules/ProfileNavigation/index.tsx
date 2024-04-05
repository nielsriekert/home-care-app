import styles from './ProfileNavigation.module.css';
import { Link } from 'react-router-dom';

export default function ProfileNavigation() {
	return (
		<nav className={styles.container}>
			<ul>
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to="/events">Events</Link></li>
			</ul>
		</nav>
	);
}
