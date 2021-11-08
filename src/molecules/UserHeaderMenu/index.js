import styles from './UserHeaderMenu.module.css';

import { Link } from 'react-router-dom';

export default function UserHeaderMenu({ items }) {
	return (
		<nav className={styles.container}>
			{items.length > 0 &&
				<ul>
					{items.map(item => (
						<li key={item.id}>
							{item.url ?
								<Link to={item.url} href={item.url}>{item.label}</Link> :
								<button onClick={item.onClick}>{item.label}</button>}
						</li>
					))}
				</ul>}
		</nav>
	);
}
