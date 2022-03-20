import './App.css';
import Login from '../Login/Login.js'
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'
import React from 'react';
import Spotify from '../../util/Spotify.js'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        userName : "",
        profilePic : null,
        searchResults : [],
        playlistName : "Enter New Playlist Name",
        playlistTracks : []
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
    this.hasAccessToken = this.hasAccessToken.bind(this)
    this.getProfileInfo = this.getProfileInfo.bind(this)
  }
  
  hasAccessToken() {
    return Spotify.isTokenMatch()  
  }

  getProfileInfo() {
    console.log('get profile info')
  
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    this.setState({playlistTracks : tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    this.setState({playlistTracks : tracks})
  }

  updatePlaylistName(name) {
    this.setState({ playlistName : name })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs
      ).then(() => {this.setState({
        playlistName : 'Enter New Playlist Name',
        playlistTracks : []
      })
      document.getElementById('playlist_name_input').value = ''
      document.getElementById('playlist_name_input').placeholder = this.state.playlistName
    })
    
  }

  search(term) {
    Spotify.search(term).then(srchResults => {
      this.setState({ searchResults : srchResults })
    })
  }

  render()  {
    const userName = this.state.userName; 
    //const backgroundImage = this.state.profilePic ? this.state.profilePic : './background_photo_desktop.jpg'
    let disabled
    let search 
    if (!this.hasAccessToken()) {
      search = (
        <Login /*onLogin={this.getProfileInfo}*/ />
      )
      disabled = true
    } else {
        search = (
          <SearchBar onSearch={this.search}/>
        );
        disabled = false
    }

    return (
      <div>
        <h1>Assemble<span className="highlight">the</span>Jams</h1>
        <div className="App" >
          <h2>{userName}</h2>
          {search}
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}/>
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              disabled={disabled}/>
          </div>
        </div>
      </div>
    )

  }
}

export default App;
