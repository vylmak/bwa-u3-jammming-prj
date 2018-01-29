let accessToken;
let expiresIn;
let spotifyURL = window.location.href;
let accessTokenInUrl = spotifyURL.match(/access_token=([^&]*)/);
let expirationTimeInUrl = spotifyURL.match(/expires_in=([^&]*)/);
let userID;
let playlistID;
const client_id = '2549e182c7cf4c5498e683641ba880c8';
const redirectUri = 'http://mycodeisjammingalright.surge.sh/';


const Spotify = {

  getAccessToken(searchTerm){
    console.log(`I'm trying to get the accessToken`);
    if (accessToken){
      //console.log(accessToken);
      console.log(`The access token is already obtained. My spotifyurl is: ${spotifyURL}`);
      return accessToken;
    } else if ( accessTokenInUrl && expirationTimeInUrl) {
      console.log(`The access token is inside the url. My spotifyurl is: ${spotifyURL}`);
      accessToken = accessTokenInUrl[1];
      //console.log(accessToken);
      expiresIn = expirationTimeInUrl[1];
      //console.log(expiresIn);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      console.log(`The access token is not yet available. You will be redirected to: https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`);
      alert(`Your previous session has expired, we will refresh your page, please enter your search keywords again shortly!`);
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`

    }
  },

  search(searchTerm){
    console.log(`I am spotify, the search keyword given to me is: ${searchTerm}`);
    console.log(`I am spotify.search, the accessToken I'm using is ${accessToken}`);
    accessToken = Spotify.getAccessToken();
    console.log(accessToken);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {Authorization:`Bearer ${accessToken}`}
    }).then(response=>{
      if (response.ok){
        //console.log(response.json());
        return response.json();
      }
      throw new Error(`Request failed!`);
    },networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      console.log(jsonResponse.tracks);
      if (!jsonResponse.tracks){return [];}
      else {
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
      }
    });
  },

  savePlaylist(playlistName,trackURIs){
    if (!playlistName || !trackURIs){return;
    } else {
          console.log(`I am getting my userID`);
          fetch('https://api.spotify.com/v1/me',{
          headers:{Authorization: `Bearer ${accessToken}`}
          }).then(response =>{
          if(response.ok){
            return response.json();
          }
          throw new Error(`Request failed!`);
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
          console.log(`This is my userID: ${jsonResponse.id}`);
          userID = jsonResponse.id;
          console.log(`I'm posting my playlistName to be: ${playlistName}, to get my playlistID`);
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: {Authorization: `Bearer ${accessToken}`},
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          }).then(response =>{
            if(response.ok){
              return response.json();
            }
            throw new Error(`Request failed!`);
          }, networkError => console.log(networkError.message)
          ).then(jsonResponse =>{
            console.log(`This is my playlistID: ${jsonResponse.id}`);
            playlistID = jsonResponse.id;
            console.log(`I'm posting my trackURI to be: ${trackURIs}, to save my new playlist`);
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
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
              console.log(`Playlist posted to Spotify!`);
              console.log(`The saved playlist version ID is: ${jsonResponse.snapshot_id}`)
              return jsonResponse;
            })
          });
    });
   }
 }

};


module.exports = Spotify;
