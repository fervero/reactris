import React, { Component } from 'react';
import './ActionButton.css';

class ActionButton extends Component {
	getButtonDOM =
		(buttonDOM) => this.buttonDOM = buttonDOM;
	action = () => {
		this.buttonDOM.blur();
		this.props.action();
	}
	render() {
		return <button
			className="btn"
			onClick={this.action}
			ref={this.getButtonDOM}
		>{this.props.description}</button>
	}
}

export { ActionButton };
