import React from "react";
import './RegistrationForm.css'
import close from '../../icons/close_white.png'

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          name : '',
          email: '',
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.encode = this.encode.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    encode(data) {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&");
    }

    handleClick() {
      this.props.toggle();
    };

    handleSubmit(e) {
      e.preventDefault()

      fetch('/', {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: this.encode({ "form-name": "registration", ...this.state })
      })
        .then(() => {
          const userEmail = e.target.email.value
          this.props.setUserEmail(userEmail)
        })
        .catch(error => alert(error))
    }
  
    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    } 

    render() {
      let transform='scaleY(0)'
      let formVisibility
      let registrationMessage
      let registrationMessageWidth = 'unset'
      const { name, email } = this.state

      if(this.props.isPopup) {
        transform='scaleY(1)'
      } else {
        transform = 'scaleY(0)'
      }
      
      if (this.props.userEmail) {
        formVisibility = 'hidden'
        registrationMessageWidth = '65%'
        registrationMessage = `Thank you. Your request has been submitted. You will be notified at ${this.props.userEmail} when your request has been processed.`

      } else {
        formVisibility = 'visible'
        registrationMessage = 'To request access, please provide your name and email address below. Be sure to use the email address associated with your Spotify account'
      }

      return (
          <div className="Registration" id='registration_form' style={{ transform : transform}}>
            <div className='formContainer'>
              <img src={close} className="close" onClick={this.handleClick} alt='close button'/>
              <h2 style={{width : registrationMessageWidth}}>{registrationMessage}</h2>
              <form className='registration' style={{visibility : formVisibility}} onSubmit={this.handleSubmit}>
                <input type="hidden" name="form-name" value="registration" />
                <input type='text' name='name' id='name' value={name} placeholder='Your First and Last Name' onChange={this.handleChange}/>
                <input type='email' name='email' id='email' value={email} placeholder='Your Spotify email' onChange={this.handleChange}/>
                <button className='RegButton'type='submit' name='submit' id='emailSubmit' >REGISTER</button>
              </form>
            </div>
          </div>
      );
    }
}

export default RegistrationForm