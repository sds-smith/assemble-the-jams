import React from 'react'

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
            <div></div>
        )
    }
}

export default UserProfile