import React from "react";
import TrackList from '../TrackList/TrackList'
import './Recommendations.css'

class Recommendations extends React.Component {
    render() {
        return (
            <div className="Recommendations">
              <h2>Recommendations</h2>
              <form className='rec-tuner'>
                <h3>Recommendation Tuner</h3>
                <label for='acousticness'>acousticness
                    <input type='range'className='slider' name='acousticness' id='acousticness' min={0} max={1} step={0.01} defaultValue={0.5}></input>
                </label>
                <label for='danceability'>danceability
                    <input type='range'className='slider' name='danceability' id='danceability' min={0} max={1} step={0.01} defaultValue={0.5}></input>
                </label>
                <label for='instrumentalness'>instrumentalness
                    <input type='range'className='slider' name='instrumentalness' id='instrumentalness' min={0} max={1} step={0.5} defaultValue={0.5}></input>
                </label>
                <label for='energy'>energy
                    <input type='range'className='slider' name='energy' id='energy' min={0} max={1} step={0.01} defaultValue={0.5}></input>
                </label>
                <label for='liveness'>liveness
                    <input type='range'className='slider' name='liveness' id='liveness' min={0} max={1} step={0.5} defaultValue={0.5}></input>
                </label>
                <label for='tempo'>tempo
                    <input type='range'className='slider' name='tempo' id='tempo' min={0} max={1} step={0.01} defaultValue={0.5}></input>
                </label>

              </form>
              <TrackList 
                 tracks={this.props.recommendations} 
                 onAdd={this.props.onAdd} 
                 isRemoval={false}/> 
            </div>
        )
    }
}

export default Recommendations