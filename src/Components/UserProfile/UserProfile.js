import React from 'react'
import './UserProfile.css'
import defaultBackground from '../App/background_photo_desktop.jpg'



class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        this.getProfileInfo = this.getProfileInfo.bind(this)
    }

    getProfileInfo() {
        this.props.getProfileInfo()
    }
    componentDidMount() {
        this.getProfileInfo()
    }

    render() {
        return (
            <div className='Profile' >
                <img src={this.props.profilePic}/>
                <h2>{this.props.userName}</h2>

            </div>
        )
    }
}

export default UserProfile