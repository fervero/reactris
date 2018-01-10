import React, { Component } from 'react';
import './Brick.css';

class Brick extends Component {
   constructor(props) {
      super(props);
      this.state = {
         shake: {},
         dead: false,
      }
   }
   componentWillReceiveProps(nextProps) {
      if ((nextProps.dead) && (!this.state.dead)) {
         const shake = { transform: "rotate(" + (Math.round((Math.random() * 15 - 7.5))) + "deg)" };
         this.setState({
            shake,
            dead: true,
         });
      }
   }
   render() {
      const style = Object.assign(
         { top: this.props.y * 24, left: this.props.x * 24 },
         this.state.shake
      );
      return (
         <div
            className={"brick " + (this.props.dead ? "brick_dead" : "")}
            style={style}>
         </div>
      );
   }
}

export { Brick };
