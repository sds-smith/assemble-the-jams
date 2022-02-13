import './App.css';
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Playlist from '../Playlist/Playlist.js'
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        searchResults : [
          {
           name : 'track1',
           artist : 'track1.artist',
           album : 'track1.album',
           id : 'track1.id'
          },            
          {
            name : 'track2',
            artist : 'track2.artist',
            album : 'track2.album',
            id : 'track2.id'
          },          
          {
            name : 'track3',
            artist : 'track3.artist',
            album : 'track3.album',
            id : 'track3.id'
          }            
        ],
        playlistName : "Playlist is New",
        playlistTracks : [
          {
            name : 'track1',
            artist : 'track1.artist',
            album : 'track1.album',
            id : 'track1.id'
          },            
          {
            name : 'track2',
            artist : 'track2.artist',
            album : 'track2.album',
            id : 'track2.id'
          },          
          {
            name : 'track3',
            artist : 'track3.artist',
            album : 'track3.album',
            id : 'track3.id'
          }            
        ]
    }

    this.addTrack = this.addTrack.bind(this)
  }
  
  addTrack(track) {
    let tracks = this.state.playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }
    tracks.push(track)
    this.setState({playlistTracks : tracks})

  }

  render()  {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
