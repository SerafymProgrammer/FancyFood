import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

//reducers
import {authReducer} from './auth/auth.reduser';
import {homeReducer} from './home/home.reduser';

const rootReducer = combineReducers({
  authReducer,
  homeReducer,
});

const configureStore = () => {
  return createStore(rootReducer, compose(applyMiddleware(thunk)));
};

export default configureStore;
