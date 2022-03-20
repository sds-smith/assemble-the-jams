import React from 'react';
import './Login.css';

class Login extends React.Component {

    render() {
        return (
            <div className='Login'>
                <h2 className='loginMessage'>This app is registered in Development mode with Spotify. In order to use the app, you must be explicitly added as a user.</h2>
                <h3 className='loginMessage'>You only need to request access once, but there may be a delay between requesting and gaining access</h3>
                <h3 className='loginMessage'>For more information on this app, please see the About page</h3>
                <input className='email_input' type='email' placeholder='Enter the email address associated with your Spotify account'/>
                <input type='radio' name='registration' id='not_reg' value='not_reg' />
                <label for='not_reg'>I am requesting access for the first time</label>
                <input type='radio' name='registration' id='reg' value='reg' />
                <label for='reg'>I am a registered user of this app</label>                
                <button className='LoginButton' onClick={this.props.onLogin}>LOG IN </button>
            </div>
        )
    }
}

export default Login;