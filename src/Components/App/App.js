import React, { Component } from 'react';
import './App.css';

import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

const Spotify = require('../../util/Spotify.js');

export class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'playlistNames',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if (!this.state.playlistTracks.filter(playlistTrack => playlistTrack.id === track.id)){
      let addedTrack = this.state.playlistTrack.push(track);
      this.setState({playlistTracks: addedTrack});
    }
  }

  removeTrack(track){
    if (this.state.playlistTracks.filter(playlistTrack => playlistTrack.id === track.id)){
      let reducedTrack = this.state.playlistTrack.filter(playlistTrack => playlistTrack.id !== track.id);
      this.setState({playlistTracks: reducedTrack});
    }
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    })
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(tracks =>
      this.setState({
        searchResults: tracks
      })
    );
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}
