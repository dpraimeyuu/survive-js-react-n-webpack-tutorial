import React from 'react';

/*
A higher-order component is just a function that takes an 
existing component and returns another component that wraps it.

connect decorator takes a react component and returns another component
It uses mechanism called mixin.
*/
const connect = (Component, store) => {
	return class Connect extends React.Component {
		constructor(props) {
			super(props);

			this.storeChanged = this.storeChanged.bind(this);
			this.state = store.getState();

			store.listen(this.storeChanged);
		}

		componentWillUnmount() {
			this.unlisten(this.storeChanged);
		}

		storeChanged() {
			this.setState(store.getState());
		}

		render() {
			return (<Component {...this.props } {...this.state } />);
		}
	}
};

export default (store) => {
	return (target) => connect(target, store);
};