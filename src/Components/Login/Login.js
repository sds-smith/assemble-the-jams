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
                    <h2 className='loginMessage'>Assemble<span className='highlight'>the</span>Jams is registered in Development mode with Spotify.</h2>
                    <h2 className='loginMessage'>In order to use the app, Spotify requires you to be added to the list of users.</h2>
                    <h3 className='loginMessage'>For more information on this app, please see the <a id='readme' href='https://github.com/sds-smith/assemble-the-jams#readme' >README</a></h3>
                    <form 
                        className='LoginForm' 
                        name='loginForm' 
                        onSubmit={this.handleSubmit}
                    >
                        <div className='regBtn'>
                            <input type='radio' name='registrationStatus' id='not_reg' value='not_reg' />
                            <label for='not_reg' id='notRegLabel'>Please check this box if you are a first-time user.</label>
                        </div>
                        <div className='regBtn'>
                            <input type='radio' name='registrationStatus' id='reg' value='reg' />
                            <label for='reg' id='regLabel'>Registered users check this box.</label>     
                        </div>
                        <button 
                            className='LoginButton' 
                            style={{display : btnDisplay}} 
                            >ENTER
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;