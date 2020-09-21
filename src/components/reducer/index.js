import { combineReducers } from 'redux'
import loginreducer from './loginreducer';
import drawerreducer from './drawerreducer'


export default combineReducers({
    login: loginreducer,
    drawer: drawerreducer,
});