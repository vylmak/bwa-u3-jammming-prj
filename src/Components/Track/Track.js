import React from 'react';
import './Track.css';

export class Track extends React.Component{
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(){
    if (this.props.isRemoval){
      console.log(`I am rendering the minus sign`)
      return <a className="Track-action"
                onClick={this.removeTrack} >
                -
             </a>;
    } else {
      console.log(`I am rendering the plus sign`)
      return <a className="Track-action"
                onClick={this.addTrack} >
                +
             </a>;
    }
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render(){
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} |{this.props.track.album}</p>
        </div>
          {console.log(`isRemoval? ${this.props.isRemoval}`)}
          {this.renderAction()}
      </div>
    );
  }
}
