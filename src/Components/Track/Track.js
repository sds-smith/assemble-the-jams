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
        if (this.props.isRemoval) {
            return <button className ="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return  <div className='Track-action-container'>
                        <button className ="Track-action play-btn" onClick={this.playTrack}><img src={PlayBtn}/></button>
                        <button className ="Track-action" onClick={this.addTrack}><img src={AddBtn}/></button>
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