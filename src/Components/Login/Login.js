import React from 'react';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        if (e.target.registrationStatus.value === 'reg') {
            this.props.onLogin()
        } else {
            this.props.toggle()        
        }
    }

    render() {
        let btnDisplay = 'flex'
        if (this.props.isPopup) {
            btnDisplay = 'none'
        } else {
            btnDisplay = 'flex'
        }

        return (
            <div className='Login'>
                <div className='formContainer'>
                    <h2 className='loginMessage' >Assemble<span className='highlight'>the</span>Jams works with your Spotify Premium account.</h2>
                    <div className = 'rollup' style={{display : btnDisplay}}>
                            <h3 className='loginMessage'>Once you authorize the app, it can be used to search for songs, artists, or albums, receiving search term matches as well as recommendations based on the Spotify algorithm.  You can even customize how your recommendations are delivered to you using a slider toolbar.</h3>
                            <h3 className='loginMessage'>Select the play button inside any track to hear it in the custom WebPlayer. Inside the WebPlayer, you can like/unlike the song (saves to your Spotify profile) or select a link to listen on Spotify.</h3>
                            <h3 className='loginMessage'>Clicking on your profile picture or username in the app takes you to your Spotify profile page.</h3>
                            <h3 className='loginMessage'>This companion app is registered in Development mode with Spotify.</h3>
                            <h3 className='loginMessage'>In order to use the app, Spotify requires you to be added to the list of users.</h3>
                            <form 
                                className='LoginForm' 
                                name='loginForm' 
                                onSubmit={this.handleSubmit}
                            >
                                <div className='regBtn'>
                                    <input type='radio' name='registrationStatus' id='not_reg' value='not_reg' />
                                    <label for='not_reg' id='notRegLabel'>First time users, please check here and select 'ENTER" to register</label>
                                </div>
                                <div className='regBtn'>
                                    <input type='radio' name='registrationStatus' id='reg' value='reg' />
                                    <label for='reg' id='regLabel'>Registered users please check this box and select 'ENTER'.</label>     
                                </div>
                                <button className='LoginButton'>
                                    ENTER
                                </button>
                            </form>
                            <h3 className='loginMessage'>For more information on this app, please see the <a id='readme' href='https://github.com/sds-smith/assemble-the-jams#readme' >README</a></h3>
                            <h3 className='loginMessage'>Please Enjoy!</h3>
                    </div>

                </div>
            </div>
        )
    }
}

export default Login;