import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router'

import { App,Login, Signup, Dashboard, FileReport,ReportDetail } from './containers'
//import {} from './components'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />            
            <Route path="dashboard" component={Dashboard}/>
            <Route path="reportItem/:id" component={ReportDetail} />
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
            <Route path="filereport" component={FileReport} />
            <Route path="myreports" component={Dashboard} />
        </Route>
    </Router>
)