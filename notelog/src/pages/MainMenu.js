import { async } from '@firebase/util'
import firebase from 'firebase/compat/app'
import React, { useState, useRef } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, firestore } from '../firebase'

export const MainMenu = () => {
	const [isChatRoomSelected, setIsChatRoomSelected] = useState(false)

	return <>{isChatRoomSelected ? <Notes /> : <ChatRoom />}</>
}

export const ChatRoom = () => {
	const messageRef = firestore.collection('messages')
	const query = messageRef.orderBy('createdAt').limit(25)
	const [messages] = useCollectionData(query, { idField: 'id' })
	const [messageValue, setMessageValue] = useState('')
	const dummy = useRef()

	const sendMessage = async (e) => {
		e.preventDefault()

		const { uid } = auth.currentUser

		await messageRef.add({
			text: messageValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
		})

		setMessageValue('')
		dummy.current.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<>
			<div>
				{messages &&
					messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
				<div ref={dummy} />
			</div>
			<form onSubmit={sendMessage}>
				<input
					value={messageValue}
					onChange={(e) => setMessageValue(e.target.value)}
				/>
				<button type="submit">send</button>
			</form>
		</>
	)
}

export const ChatMessage = (props) => {
	const { text, uid } = props.message
	const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

	return (
		<>
			<div className={`message ${messageClass}`}>
				<p>{text}</p>
			</div>
		</>
	)
}

export const Notes = () => {
	return <></>
}
