import React from 'react';
import './WebPlayer.css'
import PlayBtn from '../../icons/play_black24.png'
import SpotifyIcon from '../../icons/Spotify_Icon_RGB_Black.png'

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
            position : 0,
            duration : 0,
            active : false
        }
        
        this.setDeviceId = this.setDeviceId.bind(this)
        this.setPlayerInstance = this.setPlayerInstance.bind(this)
        this.togglePlay = this.togglePlay.bind(this)
        this.nowPlayingInterval = this.nowPlayingInterval.bind(this)
    }

    setDeviceId(id) {
        this.props.setDeviceId(id)
    }
    
    setPlayerInstance(player) {
        this.props.setPlayerInstance(player)
    }

    togglePlay() {
        this.props.playerInstance.togglePlay()
    }

    nowPlayingInterval(player) {
        const interval = setInterval(() => {
            this.props.setGradientAngle( this.props.gradientAngle - 0.5 )
            player.getCurrentState().then( ({position}) => { 
                this.setState({
                    position : position
                });
                if (this.state.position === 0) {
                    clearInterval(interval)
                    this.setState({ 
                        active : false,
                     })
                }
                console.log(this.state.active)    
            });
        }, 1000);
    }

    componentDidMount() {

        const token = this.props.getAccessToken()
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'Assemble the Jams',
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
                this.setState({
                    current_track : state.track_window.current_track,
                    position : state.position,
                    duration : state.duration,
                });
                
                this.nowPlayingInterval(player)

                player.getCurrentState().then( state => { 
                    (!state)? this.setState({ active : false }) : this.setState({ active : true})
                });
            }));
            player.connect();
        };
    }

   render() {
  
    let currentPosition = this.state.position / 1000
    let positionMins = Math.floor(currentPosition / 60).toString()
    let positionSec = (currentPosition % 60).toFixed(0).toString()
    positionSec = positionSec.length < 2 ? '0' + positionSec : positionSec

    let currentDuration = this.state.duration / 1000
    let durationMins = Math.floor(currentDuration / 60).toString()
    let durationSec = (currentDuration % 60).toFixed(0).toString()
    durationSec = durationSec.length < 2 ? '0' + durationSec : durationSec

    const webPlayerDisplay = this.state.active ? 'flex' : 'none'
    const progress = (this.state.position/this.state.duration)*100
    return (     
        <div className="WebPlayer">
            <div className="Player"
                style={{display : webPlayerDisplay}} >
                <div className='spotify-attributor listen-on'>
                    <a className='spotify-link'href='https://open.spotify.com/' target='_blank' rel="noreferrer">
                        <img src={SpotifyIcon} id='spotify-icon' alt='spotify icon'/>
                        <p id='listen'>Listen on Spotify</p>
                    </a>
                </div>

                <img  src={this.state.current_track.album.images[0].url} 
                     className="now-playing__cover" alt="" 
                />
                <div className="now-playing_label">
                    <div className="now-playing__name">{
                                  this.state.current_track.name
                    }</div>
                    <div className="now-playing__artist">{
                                  this.state.current_track.artists[0].name
                    }</div>
                </div>
                <div className='btn-container'>
                    <button className ="play-pause" onClick={this.togglePlay}><span>|</span><img src={PlayBtn} alt='play or pause button'/></button>
                </div>   

                <div className='progress-container'>
                    <p>{`${positionMins}:${positionSec}`}</p>
                    <div className='progress-bar'>
                        <div className='progress-fill' 
                            style={{width: `${progress}%`}} >
                        </div>
                    </div>
                    <p>{`${durationMins}:${durationSec}`}</p>
                </div>

            </div>
        </div>


    );
  }
}

export default WebPlayer