import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

const notes = [
	{
		id: uuid.v4(),
		task: 'Learn Webpack'
	},
	{
		id: uuid.v4(),
		task: 'Learn React'
	},
	{
		id: uuid.v4(),
		task: 'Do laundry'
	}
];

class NoteStore {
	constructor() {
		this.bindActions(NoteActions);

		this.notes = notes;
		
		this.exportPublicMethods({
			get: this.get.bind(this)
		});
	}
	
	get(ids = []) {
		return ids.map((id) => this.notes[this.findNote(id)]).filter((a) => a);
	}

	create(note) {
		const notes = this.notes;
		note.id = uuid.v4();
		this.setState({
			notes: notes.concat(note)
		});
	}
	
	update({id, task}) {
		const notes = this.notes;
		const noteIndex = this.findNote(id);
		
		if(notes[noteIndex] < 0){
			return;
		}
		
		notes[noteIndex].task = task;
		this.setState({notes});
	}
	
	delete(id) {
		const notes = this.notes;
		const noteIndex = this.findNote(id);
		
		if(noteIndex < 0){
			return;
		}
		
		this.setState({
			notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
		});
	}
	
	findNote(id){
		const notes = this.notes;
		const noteIndex = notes.findIndex((note) => note.id === id);
		
		if(noteIndex < 0){
			console.warn('Failed to find note', notes, id);
		}
		
		return noteIndex;
	}
}

export default alt.createStore(NoteStore, 'NoteStore');