import { useState } from 'react';
const EditNote = ({  note, handleEditNote }) => {
	const characterLimit = 200;
	const [editNoteText, setEditNoteText] = useState('');

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setEditNoteText(event.target.value);
		}
	};

	const handleSaveClick = () => {
		if (editNoteText.trim().length > 0) {
			handleEditNote(editNoteText);
		}
	};

	return (
		<div className='note new ${toggle}'>
			<textarea
				rows='8'
				cols='10'
				placeholder='Type to edit a note...'
				value={note.text}
				onChange={handleChange}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimit - note.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default EditNote;