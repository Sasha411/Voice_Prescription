import React from 'react'
import Header from '../dashboard/Header'
import {connect} from 'react-redux';

const voiceHistory = () => {
    return (
        <div>
            <Header />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, null) (voiceHistory)