import React from 'react'
import Track from '../Track/Track'
import './TrackList.css'

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {

                        return <Track   deviceId={this.props.deviceId}
                                        track={track}
                                        key={track.id}
                                        onPlay={this.props.onPlay}
                                        onAdd={this.props.onAdd}
                                        onRemove={this.props.onRemove}
                                        isRemoval={this.props.isRemoval}/>
                    })
                }
            </div>
        )
    }
}

export default TrackList