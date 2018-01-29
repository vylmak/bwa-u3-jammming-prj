import React from 'react';
import './App.css';

import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

export class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'codecademy playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }


  addTrack(track){
    console.log(`I'm going to add a track`);
    let currentTrack = this.state.playlistTracks;
    if (!currentTrack.includes(track)){
      currentTrack.push(track);
    };
    this.setState({playlistTracks: currentTrack});
  }

  removeTrack(track){
    console.log(`I'm going to remove a track`);
    let currentTrack = this.state.playlistTracks;
    if (currentTrack.includes(track)){
      currentTrack.splice(currentTrack.indexOf(track),1);
    }
    this.setState({playlistTracks: currentTrack});
  }

  updatePlaylistName(name){
    console.log(`I am updating the playlistname to be: ${name}.`)
    this.setState({playlistName: name});
  }

  savePlaylist(){
    console.log(`I am saving the playlist and calling it: ${this.state.playlistName}.`)
    console.log(`The tracks to be saved are ${this.state.playlistTracks}`)
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    })
  }

  search(searchTerm){
    console.log(`I am app, I'm referring this searchTerm to Spotify: ${searchTerm}`);
    Spotify.search(searchTerm).then(searchResult => {
      this.setState({
        searchResults: searchResult
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App" >
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          {console.log(`I am app, I am rendering searchresults`)}
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            {console.log(`I am App, I am rendering playlist`)}
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>

          </div>
        </div>
      </div>
    );
  }
}
