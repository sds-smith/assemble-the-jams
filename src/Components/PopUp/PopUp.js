import React from "react";
import './PopUp.css'

class PopUp extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClick() {
      this.props.toggle();
    };

    handleSubmit(e) {
      e.preventDefault()
      const userEmail = e.target.email.value
      this.props.setUserEmail(userEmail)
    }
  
    render() {
      let formVisibility
      let registrationMessage

      if (this.props.userEmail) {
        formVisibility = 'hidden'
        registrationMessage = `Thank you. Your request has been submitted. You will be notified at ${this.props.userEmail} when your request has been processed.`

      } else {
        formVisibility = 'visible'
        registrationMessage = 'To request access, please provide your name and email address below. Be sure to use the email address associated with your Spotify account'
      }

      return (
        <div className="modal">
          <div className="modal_content">
            <span className="close" onClick={this.handleClick}>
              &times;
            </span>
            <div className='modal_main'>
              <h2 >{registrationMessage}</h2>
              <form className='registration' name='registration' method='post' value='registration' style={{visibility : formVisibility}} onSubmit={this.handleSubmit}>

                <input type="hidden" name="form-name" value="loginForm" />
                <input type='text' name='name' id='name' placeholder='Your First and Last Name' />
                <input type='email' name='email' id='email' placeholder='Your Spotify email' />
                <button className='RegButton'type='submit' name='submit' id='emailSubmit' >SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
}

export default PopUp