import LoggedOut from '../../templates/LoggedOut';

// TODO: no 404 status http code yet
export default function FourOFour() {
	return (
		<LoggedOut>
			<h1>404 not found</h1>
		</LoggedOut>
	);
}
