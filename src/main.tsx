import * as React from 'react';
import { render } from 'react-dom';
import { Router, RouterContext, hashHistory } from 'react-router';
import { Provider } from 'mobx-react';
import routes from './routes';
import { createClientState } from './state';
import actions from './actions';

const state = createClientState();
const context = {
    state,
    actions: actions(state)
}

function renderApp() {
    const container = document.getElementById('app');
    render(
        <div>
            <Provider history={hashHistory} {...context}>
                <Router
                    history={hashHistory}
                    routes={routes(context)}/>
            </Provider>
        </div>,
        container);
}

// Render HTML on the browser
(function () {
    renderApp();
})();

