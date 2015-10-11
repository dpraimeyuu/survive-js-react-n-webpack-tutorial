import AltContainer from 'alt/AltContainer';
import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';

export default class App extends React.Component {
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
	
	render() {
		const notes = this.props.notes;
		return (
			<div>
			<button className="add-note" onClick={this.addNote}>+</button>
			<AltContainer
				stores={[NoteStore]}
				inject={ {
						items: () => NoteStore.getState().notes
					}
				}
			>
			<Notes
			 onEdit={this.editNote}
			 onDelete={this.deleteNote}
			 />
			 </AltContainer>
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