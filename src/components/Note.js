import { MdDeleteForever } from 'react-icons/md';
import { MdEditNote } from 'react-icons/md';

import { useState } from 'react';

const Note = ({ id, note,text, date, handleEditNote, handleDeleteNote, handleUpdateNote }) => {

	const characterLimit = 200;
	const [editNoteText, setEditNoteText] = useState('');

	const handleUpdateChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setEditNoteText(event.target.value);
		}
	};

	const handleUpdateClick = () => {
		if (editNoteText.trim().length > 0) {
			note.text = editNoteText;
			note.id = id;
			note.state = 'view';
			handleUpdateNote(note);
			setEditNoteText('');
		}
	};

	return (
		<>
		{note.state === 'view' && (
		<div className='note'>
			<span>{text}</span>
			<div className='note-footer'>
				<small>{date}</small>
				<MdEditNote
					onClick={() => handleEditNote(note)}
					className='delete-icon'
					size='1.3em'
				/>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.3em'
				/>
			</div>
		</div>
		)}
		{note.state === 'edit' && (
			

		<div className='note edit'>
		<textarea className="editNote"
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				defaultValue={text}
				onChange={handleUpdateChange}
			></textarea>
		<div className='note-footer'>
			<small>
				{characterLimit - text.length} Remaining
			</small>
			<button className='save' onClick={handleUpdateClick}>
				Update
			</button>
		</div>
		</div>


      	)}
		</>
	);
};

export default Note;