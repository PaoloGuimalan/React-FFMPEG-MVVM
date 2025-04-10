import { combineReducers, configureStore} from '@reduxjs/toolkit';
import { setAuthentication } from '../actions';

const combiner = combineReducers({
    authentication: setAuthentication
});

const store = configureStore({
    reducer: combiner
});

export default store;

