import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/authReducer';
import ReportReducer from './reducers/reportReducer';

import AuthMiddleware from './middleware/authMiddleware'
import ReportMiddelware from './middleware/reportMiddelware'

export {
    AuthMiddleware,
    ReportMiddelware
}


//const middleware = applyMiddleware(thunk,logger());
const middleware = compose(
      applyMiddleware(thunk,logger())
      /*,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
    );
export const rootReducer = combineReducers({
    AuthReducer,
    ReportReducer
// more reducers go here
})

export let store = createStore(
    rootReducer,
    middleware
    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);