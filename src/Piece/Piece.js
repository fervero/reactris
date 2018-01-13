import React, { Component } from 'react';

class Piece extends Component {
  constructor() {
    super();
    this.state = {
      game: new Game()
    };
  }
  render() {
    return (
      <div className="piece">
      </div>
    );
  }
}

export default Piece;
