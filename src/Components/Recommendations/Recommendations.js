import React from "react";
import TrackList from '../TrackList/TrackList'
import './Recommendations.css'
import spinner from '../../icons/spinner_white48.png'

class Recommendations extends React.Component {
    render() {
        return (
            <div className="Recommendations">
              <h2>Recommendations</h2>
              <h3 id='loading' ><img src={spinner} id='spinner' alt='spinner'/> Loading . . .</h3>
              <TrackList 
                 tracks={this.props.recommendations} 
                 onPlay={this.props.onPlay}
                 onAdd={this.props.onAdd} 
                 trackType={'recommendations'}/> 
            </div>
        )
    }
}

export default Recommendations