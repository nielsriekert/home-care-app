import styles from './SettingGroup.module.css';

import Button from '../../atoms/Button';

export default function SettingGroup({
	name,
	updateButtonLabel,
	value,
	onUpdate,
}: {
	name: string,
	updateButtonLabel?: string,
	value: string,
	onUpdate: (name: string, value: string) => void,
}) {
	const onClick = () => {
		if (typeof onUpdate === 'function') {
			onUpdate(name, value);
		}
	};

	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<h2>{name}</h2>
				<div className={styles.value}>{value || '-'}</div>
			</div>
			<Button type="secondary" onClick={onClick}>{updateButtonLabel || 'Update'}</Button>
		</section>
	);
}
