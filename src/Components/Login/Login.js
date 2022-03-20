import React from 'react';
import './Login.css';

class Login extends React.Component {

    render() {
        return (
            <div className='Login'>
                <h2 className='loginMessage'>Assemble the Jams is registered in Development mode with Spotify.</h2>
                <h2 className='loginMessage'>In order to use the app, you must be registered as a user.</h2>
                <h3 className='loginMessage'>For access, please complete the form below. You will be notified by email when your request has been processed.</h3>
                <h3 className='loginMessage'>For more information on this app, please see the <a id='readme' href='https://github.com/sds-smith/assemble-the-jams#readme' >README</a></h3>
                <div className='LoginForm' /*onSubmit={this.props.onLogin}*/>
                    {/* <label for='emailInput'>Enter email address associated with your Spotify account</label> */}
                    <input className='email_input' id='emailInput' type='email' placeholder='Spotify email'/>
                    <div className='regBtn'>
                        <input type='radio' name='registration' id='not_reg' value='not_reg' />
                        <label for='not_reg' id='notRegLabel'>I am requesting access for the first time</label>
                    </div>
                    <div className='regBtn'>
                        <input type='radio' name='registration' id='reg' value='reg' />
                        <label for='reg' id='regLabel'>I am a registered user of this app</label>     
                    </div>
           
                    <button className='LoginButton' onClick={this.props.onLogin}>SUBMIT </button>
                </div>

            </div>
        )
    }
}

export default Login;