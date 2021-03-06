import React from 'react'
import Header from './Header'
import {connect} from 'react-redux';

const Dashboard = (props) => {
    return (
        <div>
            {props.user}
            <Header />
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, null) (Dashboard)