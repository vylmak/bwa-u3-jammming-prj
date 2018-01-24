let accessToken;
let expiresIn;
let spotifyURL = window.location.href;
let accessTokenInUrl = spotifyURL.match(/access_token=([^&]*)/);
let expirationTimeInUrl = spotifyURL.match(/expires_in=([^&]*)/);
const client_id = '2549e182c7cf4c5498e683641ba880c8';
const redirect_uri = 'http://jamming.surge.sh/';


const Spotify = {

  getAccessToken(){
    if (accessToken){
      return accessToken;
    } else if ( accessTokenInUrl && expirationTimeInUrl) {
      accessToken = accessTokenInUrl;
      expiresIn = expirationTimeInUrl;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
    }
  },

  search(searchTerm){
    let fetchURL = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    fetch(fetchURL, {
      headers: {Authorization:`Bearer ${accessToken}`}
    }).then(response=>{
      if (response.ok){
        return response.json();
      }
      throw new Error(`Request failed!`);
    },networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        if (jsonResponse.tracks){
          jsonResponse.tracks.items.map(track =>{
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          })
        } else {
          return [];
        }
      })
  },

  savePlaylist(playlistName,trackURIs){
    if (!playlistName || !trackURIs){return;
    } else {
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userID;
        const userName = 'https://api.spotify.com/v1/me';
        fetch(userName,{headers:headers}).then(response =>{
          if(response.ok){
            return response.json();
          }
          throw new Error(`Request failed!`);
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
          userID = jsonResponse.id;
          return this.playlistPostRequest(userID, playlistName, trackURIs);
        });
    }
  },

  playlistPostRequest(userID,playlistName,trackURIs){
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'POST',
      body: JSON.stringify({name: playlistName, public: false})
    }).then(response =>{
      if(response.ok){
        return response.json();
      }
      throw new Error(`Request failed!`);
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse =>{
      let playlistID = jsonResponse.id;
      return this.savePlaylistPostRequest(userID, playlistID, trackURIs);
    });
  },

  savePlaylistPostRequest(userID, playlistID, trackURIs){
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'POST',
      body: JSON.stringify({uris: trackURIs})
    }).then(response =>{
      if(response.ok){
        return response.json();
      }
      throw new Error(`Request failed!`);
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse =>{
      playlistID = jsonResponse.id;
    });
  }
};


module.exports = Spotify;
