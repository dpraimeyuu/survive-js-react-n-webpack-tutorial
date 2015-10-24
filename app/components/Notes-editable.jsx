import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note-draggable.jsx';

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
				  onMove={this.onMoveNote}
				  id={note.id}>
				<Editable
					value={note.task}
					onEdit={this.props.onEdit.bind(null, note.id)}
					onDelete={this.props.onDelete.bind(null, note.id)}
				/>
			</Note>
		);
	}
	
	onMoveNote({sourceId, targetId}){
		console.log('sourceId', sourceId, 'targetId', targetId);
	}
};