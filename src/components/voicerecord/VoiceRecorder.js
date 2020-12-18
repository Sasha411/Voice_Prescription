import Header from '../dashboard/Header'
import React from 'react'
import {connect} from 'react-redux';

const VoiceRecorder = () => {
    return (
        <div>
            <Header />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, null) (VoiceRecorder)