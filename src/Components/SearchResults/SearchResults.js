import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './SearchResults.css';

export class SearchResults extends React.Component{
  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        {console.log(`I am searchResults, I am rendering TrackList`)}
        <TrackList tracks={this.props.searchResults}
                   onAdd={this.props.onAdd}
                   isRemoval={false} />
      </div>
    );
  }
}
