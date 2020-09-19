import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Dashboard extends Component {
    render() {
        return (
            <div>
                Dashboard
                <Link to="/"><button>Login page</button></Link>
            </div>
        )
    }
}

export default Dashboard
