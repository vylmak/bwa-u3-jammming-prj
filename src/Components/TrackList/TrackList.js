import React from 'react';
import {Track} from '../Track/Track';
import './TrackList.css';

export class TrackList extends React.Component{

  render(){
    return (
      <div className="TrackList">
        {console.log(`I am tracklist, I am rendering Track`)}
        {console.log(this.props.tracks)}
        {this.props.tracks.map(track => {
          return (
            <Track key={track.id}
                   track={track}
                   onAdd={this.props.onAdd}
                   onRemove={this.props.onRemove}
                   isRemoval={this.props.isRemoval} />
          );
        })}
      </div>
    );
  }
}
