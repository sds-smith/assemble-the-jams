import React from 'react'
import './Track.css'

class Track extends React.Component {
    constructor(props) {
        super(props)

        this.addTrack = this.addTrack.bind(this)
    }
    renderAction() {
        isRemoval ? <button className ="Track-action">-</button> : 
                    <button className ="Track-action" onClick={this.addTrack}>+</button>
    }

    addTrack() {
        this.props.onAdd(this.props.track)
    }

    render() {
        return (
            <div className="Track">
              <div className="Track-information" isRemoval={this.props.isRemoval}>
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
                {this.renderAction()}
              </div>
              
            </div>            
        )
    }
}

export default Track