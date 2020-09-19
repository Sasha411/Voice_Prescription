import React, { Component } from 'react'
import { Router , Route } from 'react-router-dom'
import history from '../history'
import Login from './loginpage/Login'
import Dashboard from './dashboard/Dashboard'

export class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
            </Router>
        )
    }
}

export default App
