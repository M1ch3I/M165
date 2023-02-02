import './App.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { SignIn } from './pages/SignIn'
import { MainMenu } from './pages/MainMenu.tsx'
import { auth } from './firebase'

function App() {
	const [user] = useAuthState(auth)

	return <div className="App">{user ? <MainMenu /> : <SignIn />}</div>
}

export default App
