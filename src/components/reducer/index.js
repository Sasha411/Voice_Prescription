import { combineReducers } from 'redux'
import loginreducer from './loginreducer';


export default combineReducers({
    login: loginreducer
});