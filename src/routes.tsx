import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from "./containers/app";
import DemoText from "./containers/text";

import Project from "./containers/project/project";
import ProjectForm from "./containers/project/project-form";
import NotFound from "./containers/not-found";
import About from "./containers/about";

function requireAsync(main) {
    return function (location, next) {
        next(null, require('./components/' + main));
    };
}

function createRoutes({ state }) {

     function requireLogin(nextState, replaceState, next) {
         // if (!state.user._id) replaceState(null, '/user/login')
         next();
     }

    return (
        <Route path="/" component={App}>
            <IndexRoute component={DemoText} />
            <Route path="/home" component={DemoText} />
            <Route path="/project" component={Project} />
            <Route path="/project/:id" component={ProjectForm} />
            <Route path="/about" component={About} />
            <Route path="*" component={NotFound}/>
        </Route>);
}

export default createRoutes
