import { combineReducers } from 'redux'
import loginreducer from './loginreducer';
import drawerreducer from './drawerreducer';
import emailReducer from './emailReducer';


export default combineReducers({
    login: loginreducer,
    drawer: drawerreducer,
    email: emailReducer
});