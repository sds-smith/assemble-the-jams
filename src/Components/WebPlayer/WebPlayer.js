import React from 'react';
import Spotify from '../../util/Spotify.js'
import './WebPlayer.css'

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}
class WebPlayer extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            current_track : track,
            active : false
        }
        
        this.setDeviceId = this.setDeviceId.bind(this)
        this.setPlayerInstance = this.setPlayerInstance.bind(this)
    }

    setDeviceId(id) {
        this.props.setDeviceId(id)
    }
    
    setPlayerInstance(player) {
        this.props.setPlayerInstance(player)
    }

    componentDidMount() {

        const token = Spotify.getAccessToken()
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
    

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                this.setDeviceId(device_id);
                this.setPlayerInstance(player)
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
    
            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }
            
                this.setState({current_track : state.track_window.current_track});
            
                player.getCurrentState().then( state => { 
                    (!state)? this.setState({ active : false }) : this.setState({ active : true})
                });
            }));
            player.connect();
        };
    }
    
   render() {
       
    return (
     
        <div className="container">

            <div className="WebPlayer main-wrapper">
                <img src={this.state.current_track.album.images[0].url} 
                     className="now-playing__cover" alt="" />

                <div className="now-playing__side">
                    <div className="now-playing__name">{
                                  this.state.current_track.name
                                  }</div>

                    <div className="now-playing__artist">{
                                  this.state.current_track.artists[0].name
                                  }</div>
                </div>
            </div>
        </div>
    
    );
  }
}

export default WebPlayer