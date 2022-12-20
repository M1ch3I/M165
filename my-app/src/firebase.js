import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBJEdYs80uy6evE2rhOe4snZMarDlFC1uQ',
	authDomain: 'm165-ff8f9.firebaseapp.com',
	databaseURL:
		'https://m165-ff8f9-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'm165-ff8f9',
	storageBucket: 'm165-ff8f9.appspot.com',
	messagingSenderId: '162794756173',
	appId: '1:162794756173:web:f331d5ba6e05ca97266404',
	measurementId: 'G-D75JQBEKM3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
