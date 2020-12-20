import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './assets/scss/main.scss';


import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import Editor from './pages/Editor.jsx';
import Templates from './pages/Templates.jsx';

import Navbar from './cmps/Navbar.jsx';
import Modal from './cmps/Modal.jsx';
import Test from './Test.jsx';

const history = createBrowserHistory();

class App extends React.Component {

    render() {
        return (

            <Router history={ history }>
                <Route path="/:pathName?" component={ Navbar } />
                <div className="content-wrapper">
                    <Switch>
                        <Route path="/dashboard" component={ Dashboard } />
                        <Route path="/editor/:id?/:type?" component={ Editor } />
                        <Route path="/about" component={ About } exact />
                        <Route path="/templates" exact component={ Templates } />
                        <Route path="/" component={ Home } />
                    </Switch>
                </div>
                <Modal />
            </Router>
        );
    }
}

export default App;