import React from 'react'
import Spotify from '../../util/Spotify'
import './Track.css'

class Track extends React.Component {
    constructor(props) {
        super(props)

        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.playTrack = this.playTrack.bind(this)
    }

    playTrack(track) {
        console.log('yo', this.props.track.id)
        const uri = `spotify:track:${this.props.track.id}`
        Spotify.play({
            playerInstance: player,
            spotify_uri: uri
        })
    }

    addTrack(track) {
        this.props.onAdd(this.props.track)
    }

    removeTrack(track) {
        this.props.onRemove(this.props.track)
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className ="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return  <div className='Track-action-container'>
                        <button className ="Track-action play-btn" onClick={this.playTrack}>&#9654;</button>
                        <button className ="Track-action" onClick={this.addTrack}>+</button>
                    </div>
        }                            
    }

    render() {
        return (
            <div className="Track">
              <div className="Track-information" isremoval={this.props.isRemoval}>
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
              </div>
              {this.renderAction()}
            </div>            
        )
    }
}

export default Track