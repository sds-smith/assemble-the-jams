import React from 'react';
import './Login.css';

class Login extends React.Component {

    render() {
        return (
            <div className='Login'>
                <h3>Log in to Search</h3>
                <button className='LoginButton' onClick={this.props.onLogin}>LOG IN </button>
            </div>
        )
    }
}

export default Login;