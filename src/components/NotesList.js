import Note from './Note';
import AddNote from './AddNote';


const NotesList = ({
	notes,
	handleAddNote,
	handleEditNote,
	handleDeleteNote,
	handleUpdateNote,
}) => {
	return (
		<div className='notes-list'>
			{notes && notes.map((note) => (
				<Note
					id={note.id}
					note={note}
					text={note.text}
					date={note.date}
					handleEditNote={handleEditNote}
					handleDeleteNote={handleDeleteNote}
					handleUpdateNote={handleUpdateNote}
				/>
			))}
			
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;