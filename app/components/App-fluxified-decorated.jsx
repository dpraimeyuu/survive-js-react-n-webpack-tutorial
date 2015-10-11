import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';
import connect from '../decorators/connect';

@connect(NoteStore)
export default class App extends React.Component {
	// Removed because of the @connect decorator
	/*
	constructor(props) {
		super(props);

		this.state = NoteStore.getState();
		this.storeChanged = this.storeChanged.bind(this);
	}
	
	componentDidMount() {
		NoteStore.listen(this.storeChanged);
	}
	
	componentWillUnmount() {
		NoteStore.unlisten(this.storeChanged);
	}
	
	storeChanged(state){
		this.setState(state);
	}
	*/
	
	render() {
		const notes = this.props.notes;
		return (
			<div>
			<button className="add-note" onClick={this.addNote}>+</button>
			<Notes items={ notes }
			 onEdit={this.editNote}
			 onDelete={this.deleteNote}
			 />
			</div>
		);
	}
	
	addNote() {
		NoteActions.create({task: 'New task'});
	}
	
	editNote(id, task){
		NoteActions.update({id, task});
	}
	
	deleteNote(id){
		NoteActions.delete(id);
	}
};