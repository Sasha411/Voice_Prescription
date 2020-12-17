import React from 'react'
import Header from './Header'
import {connect} from 'react-redux';

const Dashboard = (props) => {
    return (
        <div>
            {props.archit}
            <Header />
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {archit: state.email.userId}
}

export default connect (mapStateToProps, null) (Dashboard)
