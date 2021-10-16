import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState('');

	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);


console.log(notes);


	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			state:'view',
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
		console.log(newNotes);
	};


	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	const updateNote = (updateNote) => {
		console.log(updateNote);
		
		 setNotes([...notes, updateNote]);
		//remove duplicate entries
		const tmp = new Map()
		const rs = notes.reduce((acc, e) => {
		if(tmp.has(e.id)) {
			if (!tmp.get(e.id).includes(e.text)) {
			acc.push(e)
			tmp.set(e.id, [...tmp.get(e.id), e.text])
			}
		} else {
			acc.push(e)
			tmp.set(e.id, [e.text])
		}
		return acc
		}, []);
		setNotes(rs);
	};

	const editNote = (editNote) => {
		let newNotes = notes.filter((note) => note.id !== editNote.id);
		setNotes(newNotes);


		const date = new Date();
		 let newNote = {
			id: editNote.id,
			text: editNote.text,
			state:'edit',
			date: date.toLocaleDateString(),
		};
		 //newNotes = [...newNotes, newNote];
		setNotes([...newNotes, newNote]);


		
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes && notes.filter((note) =>
						(note.text).toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleEditNote={editNote}
					handleDeleteNote={deleteNote}
					handleUpdateNote={updateNote}
				/>
			</div>
		</div>
	);
};

export default App;