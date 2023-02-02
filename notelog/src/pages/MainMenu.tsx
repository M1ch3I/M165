import firebase from 'firebase/compat/app'
import React, { useState, useRef } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, firestore } from '../firebase'
import { Card } from 'primereact/card'

interface IProps {
	changeView: (data) => void
}

export const MainMenu = () => {
	const [isChatRoomSelected, setIsChatRoomSelected] = useState(false)

	return (
		<>
			{isChatRoomSelected ? (
				<Notes
					changeView={(data) => {
						setIsChatRoomSelected(data)
					}}
				/>
			) : (
				<ChatRoom changeView={(data) => {
					setIsChatRoomSelected(data)
				}} />
			)}
		</>
	)
}

export const ChatRoom = (props: IProps) => {
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
				<button type="submit">Send</button>
				<button type="button" onClick={() => props.changeView(true)}>
					Notes
				</button>
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

export const Note = (props) => {
	const { text } = props.note

	return (
		<>
			<Card style={{ height: 'auto', maxHeight: '250px', width: 'auto', maxWidth: '250px', margin: '2%' }}>
				<h1>Note</h1>
				{text}
			</Card>
		</>
	)
}

export const Notes = (props: IProps) => {

	const messageRef = firestore.collection('notes')
	const query = messageRef.orderBy('createdAt').limit(25)
	const [notes] = useCollectionData(query, { idField: 'id' })
	const [noteValue, setNoteValue] = useState('')

	const uploadNote = async (e) => {
		e.preventDefault()

		const { uid } = auth.currentUser

		await messageRef.add({
			text: noteValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
		})

		setNoteValue('')
	}

	return (<>
		<form onSubmit={uploadNote}>
			<input
				placeholder='write note'
				value={noteValue}
				onChange={(e) => setNoteValue(e.target.value)}
			/>
			<button type='submit'>Create</button>
			<button type='button' onClick={() => props.changeView(false)}>Chat Room</button>
		</form>

		{notes && notes.map((note) => <Note key={note.id} note={note} />)}
	</>)
}
