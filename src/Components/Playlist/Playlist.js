import React from "react";
import TrackList from '../TrackList/TrackList'
import './Playlist.css'

class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.handleNameChange = this.handleNameChange.bind(this)
        this.clearInput = this.clearInput.bind(this)
    }
    clearInput() {
      document.getElementById('playlist_name_input').value = ''
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value)
    }
    render() {
        return (
            <div className="Playlist" onKeyPress={(e) => e.key === 'Enter' && this.props.onSave()}>
              <input 
                id='playlist_name_input'
                placeholder={this.props.playlistName}
                defaultValue={this.props.playlistName}
                onClick={this.clearInput}
                onChange={this.handleNameChange}
              />
              <TrackList 
                tracks={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                trackType={'playlist'}/>
              <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
            </div>            
        )
    }
}

export default Playlist