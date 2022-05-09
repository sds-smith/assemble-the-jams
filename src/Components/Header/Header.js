import React from "react";
import '../App/App.css'
import SpotifyLogo from '../../icons/Spotify_Logo_RGB_White.png'

class Header extends React.Component {

    render() {
        return (
            <div>
                <div className='spotify-attributor'>
                  <img src={SpotifyLogo} id='spotify-logo' alt='Spotify Logo'/>
                  <a href='https://www.spotify.com/us/premium/' target='_blank' rel="noreferrer"><p>Works with Spotify Premium</p></a> 
                </div>        
                <h1>Assemble<span className="highlight">the</span>Jams</h1>
            </div>  
        )
    }
}

export default Header