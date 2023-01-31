import { auth } from '../App'

const SignOut = () => {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign out</button>
	)
}
