import React from 'react'
import './Track.css'
import PlayBtn from '../../icons/play_white24.png'
import AddBtn from '../../icons/add_white24.png'


class Track extends React.Component {
    constructor(props) {
        super(props)

        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.playTrack = this.playTrack.bind(this)
    }

    playTrack(track) {
        const uri = `spotify:track:${this.props.track.id}`
        this.props.onPlay(uri)
    }

    addTrack(track) {
        this.props.onAdd(this.props.track)
    }

    removeTrack(track) {
        this.props.onRemove(this.props.track)
    }

    renderAction() {
        if (this.props.trackType === 'playlist') {
            return <button className ="Track-action" onClick={this.removeTrack}>-</button>
        } else if (this.props.trackType === 'search-results') {
            return  <div className='Track-action-container'>
                        <button className ="Track-action play-btn" onClick={this.playTrack}><img src={PlayBtn} alt='button to play track'/></button>
                        <button className ="Track-action" onClick={this.addTrack}><img src={AddBtn} alt='button to add track to playlist'/></button>
                    </div>
        } else {
            return  <div className='Track-action-container'>
                        <button className ="Track-action" onClick={this.addTrack}><img src={AddBtn} alt='button to add track to playlist'/></button>
                        <button className ="Track-action play-btn" onClick={this.playTrack}><img src={PlayBtn} alt='button to play track'/></button>
                    </div>
        }                          
    }

    render() {
        let trackStyle
        let trackInfoStyle

        if (this.props.trackType === 'recommendations') {
            trackStyle = {flexDirection : 'row-reverse'}
            trackInfoStyle = {alignItems : 'flex-end', textAlign : 'right'}
        } else {
            trackStyle = {flexDirection : 'row'}
            trackInfoStyle = {alignItems : 'unset'}
        }
        return (
            <div className="Track" style={trackStyle}>
              <div className="Track-information" style={trackInfoStyle}>
                <h3 style={trackInfoStyle}>{this.props.track.name}</h3>
                <p style={trackInfoStyle}>{this.props.track.artist} | {this.props.track.album}</p>
              </div>
              {this.renderAction()}
            </div>            
        )
    }
}

export default Track