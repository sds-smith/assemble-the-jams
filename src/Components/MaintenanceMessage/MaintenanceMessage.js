import React from 'react';
import './MaintenanceMessage.css';

class MaintenanceMessage extends React.Component {

    render() {
        let welcomeDisplay = 'flex'

        return (
            <div className='MaintenanceMessage'>
                <div className='formContainer'>
                    <h2 className='loginMessage'>Assemble<span className='highlight'>the</span>Jams is currently unavailable due to maintenance.</h2>
                    <h2 className='loginMessage'>We apologize for the inconvenience. In the meantime, please view the demo video below.  Be back shortly...</h2>

                    <div className="video-responsive">
                      <iframe    
                        height="350"
                        width='622'
                        src={`https://youtube.com/embed/fMgUQI0HRTk`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                    </div>

                    <h2 className='loginMessage' >Assemble<span className='highlight'>the</span>Jams works with your Spotify Premium account.</h2>
                    <div className = 'rollup' style={{display : welcomeDisplay}}>
                            <h3 className='loginMessage'>Once you authorize the app, it can be used to search for songs, artists, or albums, receiving search term matches as well as recommendations based on the Spotify algorithm.  You can even customize how your recommendations are delivered to you using a slider toolbar.</h3>
                            <h3 className='loginMessage'>Select the play button inside any track to hear it in the custom WebPlayer. Inside the WebPlayer, you can like/unlike the song (instantly saves to your Spotify profile) or select a link to listen on Spotify.</h3>
                            <h3 className='loginMessage'>Clicking on your profile picture or username in the app takes you to your Spotify profile page.</h3>
                            <h3 className='loginMessage'>This companion app is registered in Development mode with Spotify.</h3>
                            <h3 className='loginMessage'>To use the app, Spotify requires you to be added to the list of registered users.</h3>
                            <h3 className='loginMessage'>Please select the appropriate option below.</h3>

                            <h3 className='loginMessage'>For more information on this app, please see the <a id='readme' href='https://github.com/sds-smith/assemble-the-jams#readme' >README</a></h3>
                            <h3 className='loginMessage'>Please Enjoy!</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default MaintenanceMessage;