import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

//reducers
import { authReducer } from "./auth/auth.reduser";



const rootReducer = combineReducers({
  auth_reducer: authReducer,
});

const configureStore = () => {
  return createStore(rootReducer, compose(applyMiddleware(thunk)));
};

export default configureStore;
