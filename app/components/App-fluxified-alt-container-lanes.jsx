import AltContainer from 'alt/AltContainer';
import React from 'react';
import uuid from 'node-uuid';
import Lanes from './Lanes.jsx';
import LaneStore from '../stores/LaneStore';
import LaneActions from '../actions/LaneActions';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5'; 

@DragDropContext(HTML5Backend)
export default class App extends React.Component {	
	render() {
		return (
			<div>
			<button className="add-lane" onClick={this.addItem}>+</button>
			<AltContainer
				stores={[LaneStore]}
				inject={ {
						items: () => LaneStore.getState().lanes || []
					}
				}
			>
			<Lanes/>
			 </AltContainer>
			</div>
		);
	}
	
	addItem() {
		LaneActions.create({name: 'New lane'});
	}
};