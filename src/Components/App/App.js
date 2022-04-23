import './App.css';
import Login from '../Login/Login.js'
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'
import React from 'react';
import Spotify from '../../util/Spotify.js'
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import Recommendations from '../Recommendations/Recommendations';
import WebPlayer from '../WebPlayer/WebPlayer';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        isLoggedIn : false,
        accessToken : '',
        deviceId : '',
        playerInstance : undefined,
        isPopup : false,
        userEmail : "",
        userName : "",
        profilePic : null,
        searchResults : [],
        seedTracks : [],
        recommendations : [],
        searchPass : 0,
        playlistName : "Enter New Playlist Name",
        playlistTracks : []
    }

    this.playTrack = this.playTrack.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
    this.hasAccessToken = this.hasAccessToken.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProfileInfo = this.getProfileInfo.bind(this)
    this.togglePop = this.togglePop.bind(this)
    this.setUserEmail = this.setUserEmail.bind(this)
    this.setSeeds = this.setSeeds.bind(this)
    this.setDeviceId = this.setDeviceId.bind(this)
    this.setPlayerInstance = this.setPlayerInstance.bind(this)
  }
  
  togglePop() {
    let notIsPopup = !this.state.isPopup
    this.setState({ isPopup : notIsPopup })
  }

  setUserEmail(userEmail) {
    this.setState({ userEmail : userEmail })
  }

  hasAccessToken() {
    return Spotify.isTokenMatch()  
  }

  getAccessToken() {
    const token = Spotify.getAccessToken()
    console.log('token',token)
    this.setState({ 
      accessToken : token
    })
  }

  getProfileInfo() {
    Spotify.getProfileInfo().then(user => {
      if (user.images.length) {
        this.setState({ profilePic : user.images[0].url })
      } 
      this.setState({ userName : user.id })
    })
  }

  playTrack(uri) {
    Spotify.play(this.state.deviceId, {
      playerInstance : this.state.playerInstance,
      spotify_uri : uri,
    })
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

  search(term, tunerAttributes) {
    Spotify.search(term).then(srchResults => {
      document.getElementById('loading').style.display='block'
      this.setState({ searchResults : srchResults })
      this.setSeeds(srchResults)
      Spotify.getRecommendations(this.state.seedTracks, tunerAttributes).then(recs => {
        this.setState({ recommendations : recs })
        document.getElementById('loading').style.display='none'
      })
      this.setState({searchPass : this.state.searchPass < 5 ? this.state.searchPass + 2 : this.state.searchPass})
    })
  }

  setSeeds(srchResults) {
    const seeds = srchResults.slice(0, 5).map(track => track.id)
    for (let i = this.state.searchPass - 1; i >=0; i --) {
      seeds.pop()
      seeds.unshift(this.state.seedTracks[i])
    }
    this.setState({ seedTracks : seeds })
  }

  setDeviceId(id) {
    this.setState({ deviceId : id })
    console.log("set device id", this.state.deviceId)
  }

  setPlayerInstance(player) {
    this.setState({ playerInstance : player })
  }

  render()  {
    const backgroundImage = this.state.profilePic ? `url(${this.state.profilePic})` : 'url(./background_photo_desktop.jpg)'
    let disabled
    let app 
    let popUp
    let webPlayer

    if (this.hasAccessToken()) {
      webPlayer = (
        <WebPlayer 
          setDeviceId={this.setDeviceId}
          setPlayerInstance={this.setPlayerInstance}
        />
      )
    } else {
      webPlayer = (
        <div style={{height: '200px'}}></div>
      )
    }

    if (this.state.isPopup) {
      popUp = (
        <RegistrationForm toggle={this.togglePop} setUserEmail={this.setUserEmail} userEmail={this.state.userEmail} />
      )
    } else {
      popUp = (
        <div style={{display: 'none'}} ></div>
      )
    }

    if (!this.state.isLoggedIn) {
      app = (
        <div>
          <Login 
            onLogin={()=>{
              this.setState({ isLoggedIn : true })
              this.getAccessToken()
              this.getProfileInfo()
            }} 
            toggle={this.togglePop}
          />
          {popUp}
        </div>
      )
      disabled = true
    } else {
      app = (
        <div className="App" id='App' style={{backgroundImage : backgroundImage}} >
        <h2>{this.state.userName}</h2>
        <SearchBar onSearch={this.search}/>
        {webPlayer}
        <div className="App-playlist">
          <SearchResults 
            searchResults={this.state.searchResults}
            deviceId={this.state.deviceId}
            onPlay={this.playTrack}
            onAdd={this.addTrack}/>
          <Recommendations 
            recommendations={this.state.recommendations}
            deviceId={this.state.deviceId}
            onPlay={this.playTrack}
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
      )
        disabled = false
    }

    return (
      <div >
        <h1>Assemble<span className="highlight">the</span>Jams</h1>
        {app}
      </div>
    )

  }
}

export default App;
