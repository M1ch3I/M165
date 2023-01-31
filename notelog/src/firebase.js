import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const app = firebase.initializeApp({
	apiKey: 'AIzaSyA7vIb7AS4SNCnJDEMLq2c2ObFzuIfVDws',
	authDomain: 'm165-firebase-4f4d2.firebaseapp.com',
	projectId: 'm165-firebase-4f4d2',
	storageBucket: 'm165-firebase-4f4d2.appspot.com',
	messagingSenderId: '744395299223',
	appId: '1:744395299223:web:be5683ef44d8327e1dccd2',
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()
// export const app = firebase.app()
