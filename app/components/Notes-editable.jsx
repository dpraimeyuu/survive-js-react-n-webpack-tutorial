import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note-draggable.jsx';
import LaneActions from '../actions/LaneActions.js';

export default class Notes extends React.Component {
	constructor(props){
		super(props);
		
		this.renderNote = this.renderNote.bind(this);
	}
	render() {
		return (
			<ul className='notes'>{this.props.items.map(this.renderNote)}</ul>
			);
	}
	
	renderNote(note) {
		return (
			<Note className="note"
				  key={`note${note.id}`}
				  onMove={LaneActions.move}
				  id={note.id}>
				<Editable
					value={note.task}
					onEdit={this.props.onEdit.bind(null, note.id)}
					onDelete={this.props.onDelete.bind(null, note.id)}
				/>
			</Note>
		);
	}
};