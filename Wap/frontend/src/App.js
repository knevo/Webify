import React from 'react';

import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Wap from './Wap';

const history = createBrowserHistory();


export default function App() {
    return (
        <Router history={history}>
            <Route path="/:id?" component={Wap} />
        </Router>)
}
