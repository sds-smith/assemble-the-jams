import React from 'react'
import './Track.css'

class Track extends React.Component {
    constructor(props) {
        super(props)

        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className ="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return  <div className='Track-action-container'>
                        <button className ="Track-action play-btn" onClick={this.addTrack}>&#9654;</button>
                        <button className ="Track-action" onClick={this.addTrack}>+</button>
                    </div>
        }
                                
    }

    addTrack(track) {
        this.props.onAdd(this.props.track)
    }

    removeTrack(track) {
        this.props.onRemove(this.props.track)
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