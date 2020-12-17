import React, { Component } from 'react'
import { Router , Route } from 'react-router-dom'
import history from '../history'
import Login from './loginpage/Login'
import Dashboard from './dashboard/Dashboard'
import VoiceRecorder from './voicerecord/VoiceRecorder'
import Profile from './profile/Profile'
import ShowProfile from "./profile/ShowProfile";

export class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/recordvoice" exact component={VoiceRecorder} />
                <Route path="/voicehistory" exact component={null} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/profile/showall" exact component={ShowProfile} />
            </Router>
        )
    }
}

export default App
