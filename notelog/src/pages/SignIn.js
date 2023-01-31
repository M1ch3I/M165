import React from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/compat/app'

export function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		auth.signInWithPopup(provider)
	}

	return <button onClick={signInWithGoogle}>Sign in</button>
}
